import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SignInForm from '@/components/signin-form';
import { authOptions } from '@/lib/auth';

type SearchParams = Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined> | undefined;

export default async function SignInPage({ searchParams }: { searchParams?: SearchParams }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect('/');
  }

  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const registeredParam = resolvedSearchParams?.registered;
  const registered = Array.isArray(registeredParam) ? registeredParam.includes('1') : registeredParam === '1';

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-box bg-base-100 p-8 shadow">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-base-content">Sign in</h1>
        <p className="text-base-content/70">Access your account to manage posts.</p>
      </div>
      {registered && <div className="alert alert-success">Account created! Please sign in.</div>}
      <SignInForm />
      <p className="text-center text-sm text-base-content/80">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="link link-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
}
