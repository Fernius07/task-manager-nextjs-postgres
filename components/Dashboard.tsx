"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

type Task = {
    id: string;
    title: string;
    description?: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
    createdAt: string;
};

export function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            if (res.ok) {
                setTasks(await res.json());
            }
        } catch (error) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        setIsCreating(true);
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTaskTitle }),
            });
            if (res.ok) {
                setNewTaskTitle('');
                fetchTasks();
                toast.success('Task created');
            }
        } catch (error) {
            toast.error('Failed to create task');
        } finally {
            setIsCreating(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                fetchTasks();
                toast.success('Status updated');
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const deleteTask = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setTasks(tasks.filter(t => t.id !== id));
                toast.success('Task deleted');
            }
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    if (loading) return <div className="text-center p-10">Loading tasks...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8 flex gap-4">
                <form onSubmit={createTask} className="flex-1 flex gap-2">
                    <Input
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="New task title..."
                        className="flex-1"
                    />
                    <Button type="submit" isLoading={isCreating}>Add Task</Button>
                </form>
            </div>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-gray-900 border border-gray-800 p-4 rounded flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4">
                        <div>
                            <h3 className="font-bold text-lg">{task.title}</h3>
                            <div className="text-sm text-gray-400">Created: {new Date(task.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                value={task.status}
                                onChange={(e) => updateStatus(task.id, e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white"
                            >
                                <option value="PENDING">Pending</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                            <Button variant="danger" onClick={() => deleteTask(task.id)} className="text-sm px-2 py-1">Delete</Button>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <div className="text-center text-gray-500 py-10">No tasks found. Create one above!</div>
                )}
            </div>
        </div>
    );
}
