import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      navigate('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <div className="container-center">
      <div className="card p-4">
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/reset">Forgot password?</Link>
        </div>
        <div className="mt-2 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;