import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      if (res.data.role === 'teacher') {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/teacher');
      } else {
        alert("Accès réservé aux enseignants.");
      }
    } catch (err) {
      alert("Erreur de connexion.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion Enseignant</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default AdminLogin;
