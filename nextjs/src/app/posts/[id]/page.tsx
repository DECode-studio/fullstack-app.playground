import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { deletePostAction } from '../actions';

type Params = Promise<{ id: string }> | { id: string };

export default async function PostDetailPage({ params }: { params: Params }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const sessionPromise = getServerSession(authOptions);
  const postPromise = prisma.post.findUnique({
    where: { id: resolvedParams.id },
    include: {
      author: {
        select: { name: true, id: true },
      },
    },
  });

  const [session, post] = await Promise.all([sessionPromise, postPromise]);

  if (!post) {
    notFound();
  }

  const canManage = session?.user?.id === post.author?.id;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-base-content">{post.title}</h1>
          <p className="text-base-content/70">
            By {post.author?.name ?? 'Unknown'} on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        {canManage && (
          <div className="flex items-center gap-2">
            <Link href={`/posts/${post.id}/edit`} className="btn btn-outline btn-sm">
              Edit
            </Link>
            <form action={deletePostAction.bind(null, post.id)}>
              <button type="submit" className="btn btn-error btn-sm">
                Delete
              </button>
            </form>
          </div>
        )}
      </div>
      <article className="rounded-box bg-base-100 p-6 shadow">
        <div className="whitespace-pre-line text-base leading-relaxed text-base-content/90">{post.body}</div>
      </article>
      <Link href="/" className="btn btn-ghost">
        Back to posts
      </Link>
    </div>
  );
}
