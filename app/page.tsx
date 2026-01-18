import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-8">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Manage Your Tasks Efficiently
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl">
        A professional task manager built with Next.js, TypeScript, and Postgres.
        Organize your work, track progress, and get things done.
      </p>
      <div className="flex gap-4">
        <Link href="/auth/register">
          <Button className="text-lg px-8 py-3">Get Started</Button>
        </Link>
        <Link href="/auth/login">
          <Button variant="secondary" className="text-lg px-8 py-3">Login</Button>
        </Link>
      </div>
    </div>
  );
}
