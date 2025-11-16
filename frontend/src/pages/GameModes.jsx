import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gameStyles.css';

function GameModes() {
  const navigate = useNavigate();

  const gameModes = [
    {
      id: 'memory',
      name: '🧠 Jeu de Mémoire',
      description: 'Retrouve les paires identiques',
      color: 'bg-purple-400',
      emoji: '🎴'
    },
    {
      id: 'colors',
      name: '🎨 Couleurs',
      description: 'Apparie les couleurs',
      color: 'bg-pink-400',
      emoji: '🌈'
    },
    {
      id: 'counting',
      name: '🔢 Comptage',
      description: 'Compte les objets',
      color: 'bg-yellow-400',
      emoji: '🎯'
    },
    {
      id: 'animals',
      name: '🐾 Animaux',
      description: 'Reconnais les animaux',
      color: 'bg-green-400',
      emoji: '🦁'
    },
    {
      id: 'shapes',
      name: '🔶 Formes',
      description: 'Découvre les formes',
      color: 'bg-red-400',
      emoji: '⭐'
    }
  ];

  return (
    <div className="game-modes-container">
      <div className="game-modes-header">
        <h1 className="game-modes-title">🎮 Choisis ton Jeu</h1>
        <p className="game-modes-subtitle">Sélectionne un jeu pour commencer</p>
      </div>

      <div className="game-modes-grid">
        {gameModes.map((game) => (
          <button
            key={game.id}
            className={`game-mode-card ${game.color}`}
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <div className="game-mode-emoji">{game.emoji}</div>
            <div className="game-mode-name">{game.name}</div>
            <div className="game-mode-description">{game.description}</div>
            <div className="game-mode-arrow">→</div>
          </button>
        ))}
      </div>

      <button
        className="btn-back-home"
        onClick={() => navigate('/')}
      >
        ← Retour
      </button>
    </div>
  );
}

export default GameModes;
