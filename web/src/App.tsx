import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import NewPost from './pages/NewPost';
import { ToastContainer } from 'react-toastify';

const AppRoutes: React.FC = () => {
  const accessToken = localStorage.getItem('accessToken');
  const { pathname } = useLocation();
  const hideNavOn = ['/login', '/register', '/reset'].includes(pathname);

  return (
    <>
      {!hideNavOn && <NavBar />}
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route
          path="/new"
          element={accessToken ? <NewPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={accessToken ? <Feed /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
