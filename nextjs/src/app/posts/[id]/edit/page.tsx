import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import PostForm from '@/components/post-form';
import { updatePostAction } from '../../actions';

type Params = Promise<{ id: string }> | { id: string };

export default async function EditPostPage({ params }: { params: Params }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/signin');
  }

  const post = await prisma.post.findUnique({
    where: { id: resolvedParams.id },
    select: { id: true, title: true, body: true, authorId: true },
  });

  if (!post) {
    notFound();
  }

  if (post.authorId !== session.user.id) {
    redirect(`/posts/${post.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-base-content">Edit post</h1>
        <p className="text-base-content/70">Update your story and keep everyone in the loop.</p>
      </div>
      <PostForm
        action={updatePostAction.bind(null, post.id)}
        initialTitle={post.title}
        initialBody={post.body}
        submitLabel="Save changes"
      />
      <Link href={`/posts/${post.id}`} className="btn btn-ghost">
        Cancel
      </Link>
    </div>
  );
}
