import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/game">Jeux</Link>
      <Link to="/chatbot">Chatbot</Link>
      <Link to="/student">Espace Enfant</Link>
      <Link to="/admin">Espace Enseignant</Link>
      {user && user.role === 'teacher' && (
        <>
          <Link to="/teacher">Tableau Enseignant</Link>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
