import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SignUpForm from '@/components/signup-form';
import { authOptions } from '@/lib/auth';

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect('/');
  }

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-box bg-base-100 p-8 shadow">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-base-content">Create an account</h1>
        <p className="text-base-content/70">Sign up to start publishing your own posts.</p>
      </div>
      <SignUpForm />
      <p className="text-center text-sm text-base-content/80">
        Already have an account?{' '}
        <Link href="/signin" className="link link-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
}
