import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BadgeDisplay from '../components/BadgeDisplay';
import ProgressChart from '../components/ProgressChart';
import '../styles/dashboardStyles.css';

function StudentDashboard() {
  const navigate = useNavigate();
  const [playerName] = useState('Petit Champion');
  
  const badges = [
    { emoji: '🌟', name: 'Explorateur', unlocked: true },
    { emoji: '🎯', name: 'Maître de la Mémoire', unlocked: true },
    { emoji: '🎨', name: 'Expert des Couleurs', unlocked: false },
    { emoji: '🔢', name: 'Comptage Parfait', unlocked: false },
  ];

  const stats = [
    { label: 'Parties Jouées', value: '24', icon: '🎮' },
    { label: 'Jeux Réussis', value: '19', icon: '✅' },
    { label: 'Temps Total', value: '2h 30min', icon: '⏱️' },
    { label: 'Score Total', value: '850 pts', icon: '⭐' },
  ];

  const progress = 65;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">👦 Mon Espace</h1>
        <div className="player-info">
          <div className="player-avatar">🧒</div>
          <h2 className="player-name">{playerName}</h2>
        </div>
      </div>

      <div className="dashboard-content">
        {/* PROGRESS SECTION */}
        <section className="progress-section">
          <h3 className="section-title">📈 Ma Progression</h3>
          <ProgressChart progress={progress} />
          <div className="progress-text">
            <p className="progress-label">Niveau: <span className="progress-level">3</span></p>
            <p className="progress-detail">{progress}% vers le prochain niveau</p>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="stats-section">
          <h3 className="section-title">📊 Mes Statistiques</h3>
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BADGES SECTION */}
        <section className="badges-section">
          <h3 className="section-title">🏆 Mes Badges</h3>
          <div className="badges-container">
            {badges.map((badge, idx) => (
              <div 
                key={idx} 
                className={`badge-item ${badge.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="badge-emoji">{badge.emoji}</div>
                <div className="badge-name">{badge.name}</div>
                {!badge.unlocked && <div className="badge-lock">🔒</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <div className="action-buttons">
          <button className="btn-play" onClick={() => navigate('/game')}>
            🎮 Jouer
          </button>
          <button className="btn-home" onClick={() => navigate('/')}>
            🏠 Accueil
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
