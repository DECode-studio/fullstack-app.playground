import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import PostForm from '@/components/post-form';
import { authOptions } from '@/lib/auth';
import { createPostAction } from '../actions';

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/signin');
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-base-content">Create a new post</h1>
        <p className="text-base-content/70">Share something insightful with the community.</p>
      </div>
      <PostForm action={createPostAction} submitLabel="Publish" />
      <Link href="/" className="btn btn-ghost">
        Cancel
      </Link>
    </div>
  );
}
