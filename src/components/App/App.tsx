import { useState } from "react";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Modal from "../Modal/Modal";
// import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import type { Post } from "../../types/post";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState<Post | null>(null);
  // const [isEditPost, setIsEditPost] = useState();
  // const [editedPost, setEditedPost] = useState();
  const { data } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });
  const handleSearch = useDebouncedCallback((searchQuery: string) => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
  }, 1000);
  const posts = data?.posts ?? [];
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {/* <Pagination /> */}
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal>Передати через children компонент CreatePostForm або EditPostForm</Modal> */}
      <PostList posts={posts} />
    </div>
  );
}
