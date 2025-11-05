import React, { useState } from 'react';
import api from '../services/api';

function Register() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/register', { email, password, role });
    alert('Inscription réussie !');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <select onChange={e => setRole(e.target.value)}>
        <option value="student">Étudiant</option>
        <option value="teacher">Enseignant</option>
      </select>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <button type="submit">S’inscrire</button>
    </form>
  );
}

export default Register;
