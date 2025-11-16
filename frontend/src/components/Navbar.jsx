import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbarStyles.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-emoji">🎓</span>
          <span className="logo-text">EduFun</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            🏠 Accueil
          </Link>
          <Link to="/game" className="nav-link" onClick={() => setMenuOpen(false)}>
            🎮 Jeux
          </Link>
          <Link to="/student" className="nav-link" onClick={() => setMenuOpen(false)}>
            👧 Mon Espace
          </Link>
          <Link to="/chatbot" className="nav-link" onClick={() => setMenuOpen(false)}>
            🤖 Chatbot
          </Link>
          
          {!user || user.role !== 'teacher' ? (
            <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
              👨‍🏫 Enseignant
            </Link>
          ) : (
            <>
              <Link to="/teacher" className="nav-link" onClick={() => setMenuOpen(false)}>
                📊 Tableau
              </Link>
              <button className="nav-logout" onClick={handleLogout}>
                🚪 Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
