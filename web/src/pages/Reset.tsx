import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Reset: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/auth/reset', { username, password });
      toast.success('Password reset successful');
      navigate('/login');
    } catch {
      toast.error('Reset failed');
    }
  };

  return (
    <div className="container-center">
      <div className="card p-4">
        <h3 className="text-center mb-3">Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reset</button>
        </form>
        <div className="mt-2 text-center">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;