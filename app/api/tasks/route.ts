import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, description } = await request.json();
        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: user.id,
                status: 'PENDING'
            }
        });
        return NextResponse.json(task);
    } catch (e) {
        console.error('Create task error:', e);
        return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
    }
}
