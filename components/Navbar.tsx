"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export function Navbar({ user }: { user?: { email: string } | null }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/auth/login');
        router.refresh();
    };

    return (
        <nav className="border-b border-gray-800 bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-white">TaskManager</Link>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm text-gray-400 max-sm:hidden">{user.email}</span>
                            <Button variant="secondary" onClick={handleLogout} className="text-sm">Logout</Button>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <Link href="/auth/login"><Button variant="secondary">Login</Button></Link>
                            <Link href="/auth/register"><Button>Sign Up</Button></Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
