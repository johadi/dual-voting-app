import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Hide NavBar on auth routes
  const hideNavOn = ['/login', '/register', '/reset'].includes(location.pathname);
  if (hideNavOn) return null;

  return (
    <Navbar expand="lg" className="fixed-top">
      <Container className="container-center">
        <Navbar.Brand as={Link} to="/">
          <i className="bi bi-instagram" style={{ fontSize: '1.5rem' }}></i> DualVote
        </Navbar.Brand>
        <Nav>
          {accessToken && (
            <>
              <Nav.Link as={Link} to="/profile">
                <i className="bi bi-person-circle"></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/new">
                <i className="bi bi-plus-square"></i>
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
