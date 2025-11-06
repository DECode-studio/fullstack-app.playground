import Link from 'next/link';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const PAGE_SIZE = 6;

type SearchParams = Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined> | undefined;

export default async function Home({ searchParams }: { searchParams?: SearchParams }) {
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage = Array.isArray(pageParam) ? parseInt(pageParam[0] ?? '1', 10) : parseInt(pageParam ?? '1', 10);
  const page = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;

  const sessionPromise = getServerSession(authOptions);
  const postsPromise = prisma.post.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  const countPromise = prisma.post.count();

  const [session, posts, totalPosts] = await Promise.all([sessionPromise, postsPromise, countPromise]);

  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-base-content">Posts</h1>
          <p className="text-base-content/70">Browse the latest updates from our community.</p>
        </div>
        {session && (
          <Link href="/posts/new" className="btn btn-primary">
            Create Post
          </Link>
        )}
      </header>

      {posts.length === 0 ? (
        <div className="alert alert-info">
          There are no posts yet. Sign in and be the first to share something!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">
                  <Link className="link link-hover" href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-base-content/70">
                  By {post.author?.name ?? 'Unknown'} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-base-content/80">
                  {post.body.length > 220 ? `${post.body.slice(0, 220)}…` : post.body}
                </p>
                <div className="card-actions justify-end">
                  <Link href={`/posts/${post.id}`} className="btn btn-outline btn-sm">
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Link
            href={page === 1 ? '#' : `/?page=${page - 1}`}
            className={`btn btn-sm btn-ghost ${page === 1 ? 'btn-disabled' : ''}`}
            aria-disabled={page === 1}
          >
            Previous
          </Link>
          <span className="text-sm text-base-content/70">
            Page {page} of {totalPages}
          </span>
          <Link
            href={page === totalPages ? '#' : `/?page=${page + 1}`}
            className={`btn btn-sm btn-ghost ${page === totalPages ? 'btn-disabled' : ''}`}
            aria-disabled={page === totalPages}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
