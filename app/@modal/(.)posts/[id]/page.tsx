// import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

// import PostPreviewClient from './(.)posts/[id]/PostPreview.client';
// import { fetchPostById } from '@/lib/api';

// export default async function PostPreview({ params }: PostDetailsProps) {
//   return (
//     <HydrationBoundary state={dehydrate()}>
//       <PostPreviewClient />
//     </HydrationBoundary>
//   );
// }
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchPostById } from '@/lib/api';
import type { Metadata } from 'next';

interface PostPreviewProps {
  params: Promise<{
    id: string;
  }>;
}
export async function generateMetadata({ params }: PostPreviewProps): Promise<Metadata> {
  const { id } = await params;

  const post = await fetchPostById(Number(id));

  return {
    title: post.title,
    description: post.body.slice(0, 30),
  };
}
export default async function PostPreview({ params }: PostsDetailsProps) {
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
