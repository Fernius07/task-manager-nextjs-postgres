import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { title, description, status } = await request.json();

    // Verify ownership
    const existingTask = await prisma.task.findUnique({
        where: { id }
    });

    if (!existingTask || existingTask.userId !== user.id) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
        where: { id },
        data: {
            title,
            description,
            status
        }
    });

    return NextResponse.json(updatedTask);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Verify ownership
    const existingTask = await prisma.task.findUnique({
        where: { id }
    });

    if (!existingTask || existingTask.userId !== user.id) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.task.delete({
        where: { id }
    });

    return NextResponse.json({ success: true });
}
