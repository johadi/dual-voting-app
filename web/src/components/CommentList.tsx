import React, { useState } from 'react';
import axios from '../api/axios';
import { Comment } from '../types';

interface Props {
  postId: string;
  comments: Comment[];
}

const CommentList: React.FC<Props> = ({ postId, comments: initial }) => {
  const [comments, setComments] = useState(initial);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const res = await axios.post(`/posts/${postId}/comments`, { content });
    setComments(c => [...c, res.data]);
    setContent('');
  };

  return (
    <div className="comments-container">
      {comments.map(c => (
        <div key={c.id} className="comment">
          <div className="comment-content">
            <span className="comment-username">{c.username}</span>{c.content}
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="comment-input-form d-flex">
        <input
          className="form-control me-2"
          placeholder="Add a comment..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Post</button>
      </form>
    </div>
  );
};

export default CommentList;