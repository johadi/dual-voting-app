import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ username: string; profileImage: string | null } | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data);
      } catch {
        toast.error('Failed to load profile');
      }
    }
    fetchMe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error('Select an image');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/auth/profile-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUser(prev => prev ? { ...prev, profileImage: res.data.profileImage } : prev);
      toast.success('Profile image updated');
    } catch {
      toast.error('Upload failed');
    }
  };

  if (!user) return <div className="container-center">Loading...</div>;

  return (
    <div className="container-center">
      <div className="card p-4">
        <h3 className="text-center mb-3">Profile</h3>
        <div className="text-center mb-3">
          <img
            src={user.profileImage ? `${process.env.REACT_APP_API_URL}/profiles/${user.profileImage}` : '/default-avatar.png'}
            alt="avatar"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="file" accept="image/*" className="form-control" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Upload</button>
        </form>
      </div>
    </div>
);
};

export default Profile;