import Link from 'next/link';
import type { Session } from 'next-auth';
import SignOutButton from './sign-out-button';

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  return (
    <nav className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold text-base-content">
            Fusstack Posts
          </Link>
          <ul className="hidden items-center gap-2 sm:flex">
            <li>
              <Link href="/" className="btn btn-sm btn-ghost">
                Posts
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/posts/new" className="btn btn-sm btn-primary">
                  New Post
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="hidden text-sm text-base-content/80 sm:inline">
                {session.user?.name}
              </span>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-ghost">
                Sign in
              </Link>
              <Link href="/signup" className="btn btn-sm btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
