'use client';

import { useQuery } from '@tanstack/react-query';
import css from './PostDetails.module.css';
// import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPostById, fetchUserById } from '@/lib/api';

// import { User } from '@/types/user';

export default function PostDetailsClient() {
  const params = useParams<{ id: string }>();
  const postId = Number(params.id);
  const router = useRouter();
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    refetchOnMount: false,
  });
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => fetchUserById(post!.userId),
    enabled: !!post,
  });
  const handleClickBack = () => {
    return router.back();
  };
  if (postLoading || userLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (postError || userError) {
    return <p>Something went wrong.</p>;
  }
  if (!post) return null;
  // useEffect(() => {
  //   const fn = async () => {};
  //   fn();
  // }, []);

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button onClick={handleClickBack} className={css.backBtn}>
              ← Back
            </button>

            <div className={css.post}>
              <div className={css.wrapper}>
                <div className={css.header}>
                  <h2>{post.title}</h2>
                </div>

                <p className={css.content}>{post.body}</p>
              </div>
              <p className={css.user}>Author: {user?.name}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
