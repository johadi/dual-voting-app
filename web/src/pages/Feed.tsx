import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import PostCard from '../components/PostCard';
import { Post } from '../types';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get<Post[]>('/posts');
      setPosts(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return <div className="container-center">{posts.map(post => <PostCard key={post.id} post={post} />)}</div>;
}; export default Feed;