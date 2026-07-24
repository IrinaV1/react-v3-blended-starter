"use client";

// import { useQuery } from '@tanstack/react-query';
// import Modal from '@/components/Modal/Modal';
// import { fetchPostById, fetchUserById } from '@/lib/api';
// import { useParams, useRouter } from 'next/navigation';

// import css from "./PostPreview.module.css";
import { useEffect, useState } from "react";
// import { User } from '@/types/user';

// export default function PostPreviewClient() {
//   const [user, setUser] = useState<User | null>(null);
//   const params = useParams<{ id: string }>();
//   const postId = Number(params.id);
//   const router = useRouter();
//   const { data: post } = useQuery({
//     queryKey: ["post", postId],
//     queryFn: () => fetchPostById(postId),
//     refetchOnMount: false,
//   });

//   useEffect(() => {
//     if (!post) return;
//     const fn = async () => {
//       const result = await fetchUserById(post.userId);
//       setUser(result);
//     };
//     fn();
//   }, [post]);

//   const handleClickBack = () => {
//     return router.back();
//   };

//   return (
//     <Modal onClose={handleClickBack}>
//       <button onClick={handleClickBack} className={css.backBtn}>
//         ← Back
//       </button>
//       <div className={css.post}>
//         <div className={css.wrapper}>
//           <div className={css.header}>
//             <h2>{post?.title}</h2>
//           </div>

//           <p className={css.content}>{post?.body}</p>
//         </div>
//         <p className={css.user}>{user?.name}</p>
//       </div>
//     </Modal>
//   );
// }
