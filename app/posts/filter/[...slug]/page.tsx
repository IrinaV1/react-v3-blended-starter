import PostsPageClient from './PostsPage.client';
import { fetchPosts } from '@/lib/api';

interface PostsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}
export default async function PostsPage({ params }: PostsPageProps) {
  console.log('slug');
  const { slug } = await params;
  console.log(slug);

  const userId = slug[0] === 'All' ? undefined : slug[0];

  console.log(userId);

  const initialData = await fetchPosts({
    searchText: '',
    page: 1,
    userId,
  });
  return <PostsPageClient userId={userId} initialData={initialData} />;
}
