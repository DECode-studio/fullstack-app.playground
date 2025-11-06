'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const postSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(255),
  body: z.string().trim().min(1, 'Content is required'),
});

export async function createPostAction(prevState: { error?: string } | undefined, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/signin');
  }

  const parsed = postSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!parsed.success) {
    const firstError =
      parsed.error.flatten().fieldErrors.title?.[0] ?? parsed.error.flatten().fieldErrors.body?.[0] ?? 'Invalid data.';
    return { error: firstError };
  }

  await prisma.post.create({
    data: {
      title: parsed.data.title,
      body: parsed.data.body,
      authorId: session.user.id,
    },
  });

  revalidatePath('/');
  redirect('/');
}

export async function updatePostAction(postId: string, prevState: { error?: string } | undefined, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/signin');
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });

  if (!post || post.authorId !== session.user.id) {
    return { error: 'You are not allowed to edit this post.' };
  }

  const parsed = postSchema.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!parsed.success) {
    const firstError =
      parsed.error.flatten().fieldErrors.title?.[0] ?? parsed.error.flatten().fieldErrors.body?.[0] ?? 'Invalid data.';
    return { error: firstError };
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      title: parsed.data.title,
      body: parsed.data.body,
      updatedAt: new Date(),
    },
  });

  revalidatePath('/');
  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}

export async function deletePostAction(postId: string, _formData?: FormData) {
  void _formData;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/signin');
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });

  if (!post || post.authorId !== session.user.id) {
    redirect(`/posts/${postId}`);
  }

  await prisma.post.delete({ where: { id: postId } });

  revalidatePath('/');
  redirect('/');
}
