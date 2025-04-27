import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const NewPost: React.FC = () => {
  const [imageA, setImageA] = useState<File|null>(null);
  const [imageB, setImageB] = useState<File|null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageA || !imageB) return toast.error('Select both images');
    const formData = new FormData();
    formData.append('imageA', imageA);
    formData.append('imageB', imageB);
    try {
      await axios.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
    } catch {
      toast.error('Post creation failed');
    }
  };

  return (
    <div className="container-center">
      <div className="post-form-card card p-4">
        <h3 className="text-center mb-3">New Post</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="file" className="form-control" accept="image/*" onChange={e => setImageA(e.target.files?.[0] || null)} />
          </div>
          <div className="mb-3">
            <input type="file" className="form-control" accept="image/*" onChange={e => setImageB(e.target.files?.[0] || null)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;