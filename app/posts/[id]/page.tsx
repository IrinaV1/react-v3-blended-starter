import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import css from './PostDetails.module.css';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';
import type { Metadata } from 'next';

interface PostsDetailsProps {
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata({ params }: PostsDetailsProps): Promise<Metadata> {
  const { id } = await params;

  const post = await fetchPostById(Number(id));

  return {
    title: post.title,
    description: post.body.slice(0, 30),
  };
}
export default async function PostDetails({ params }: PostsDetailsProps) {
  const { id } = await params;
  const postId = Number(id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
