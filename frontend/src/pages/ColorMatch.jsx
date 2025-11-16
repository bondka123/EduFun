import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gameStyles.css';

function ColorMatch() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const colors = [
    { name: 'Rouge', hex: '#EF4444', emoji: '🔴' },
    { name: 'Bleu', hex: '#3B82F6', emoji: '🔵' },
    { name: 'Jaune', hex: '#FBBF24', emoji: '🟡' },
    { name: 'Vert', hex: '#10B981', emoji: '🟢' },
    { name: 'Rose', hex: '#EC4899', emoji: '🩷' },
    { name: 'Orange', hex: '#F97316', emoji: '🟠' }
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    
    const randomColors = [randomColor];
    while (randomColors.length < Math.min(level + 2, colors.length)) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (!randomColors.find(c => c.name === color.name)) {
        randomColors.push(color);
      }
    }
    
    setOptions(randomColors.sort(() => Math.random() - 0.5));
    setAnswered(false);
    setCorrect(false);
  };

  const handleColorClick = (selectedColor) => {
    setAnswered(true);
    if (selectedColor.name === targetColor.name) {
      setCorrect(true);
      setScore(score + 10);
      setTimeout(() => {
        setLevel(level + 1);
      }, 1500);
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">🎨 Jeu des Couleurs</h1>
        <div className="game-stats">
          <div className="stat-box">Score: <span className="stat-value">{score}</span></div>
          <div className="stat-box">Niveau: <span className="stat-value">{level}</span></div>
        </div>
      </div>

      <div className="color-match-content">
        <div className="color-instruction">
          <p className="instruction-text">Clique sur la couleur : </p>
          <div className="target-color-display">
            {targetColor && (
              <>
                <div
                  className="color-circle"
                  style={{ backgroundColor: targetColor.hex }}
                ></div>
                <p className="color-name">{targetColor.name}</p>
              </>
            )}
          </div>
        </div>

        <div className="color-options">
          {options.map((color) => (
            <button
              key={color.name}
              className={`color-button ${
                answered && color.name === targetColor.name ? 'correct' : ''
              } ${answered && color.name !== targetColor.name ? 'incorrect' : ''}`}
              onClick={() => !answered && handleColorClick(color)}
              disabled={answered}
              style={{ backgroundColor: color.hex }}
            >
              <span className="color-emoji">{color.emoji}</span>
              <span className="color-label">{color.name}</span>
            </button>
          ))}
        </div>

        {answered && correct && (
          <div className="feedback positive">
            ✅ Bravo! C'est correct!
          </div>
        )}

        {answered && !correct && (
          <div className="feedback negative">
            ❌ Essaie encore!
          </div>
        )}
      </div>

      <div className="game-controls">
        <button className="btn-secondary" onClick={() => { setLevel(1); setScore(0); generateLevel(); }}>
          🔄 Recommencer
        </button>
        <button className="btn-secondary" onClick={() => navigate('/game')}>
          ← Retour
        </button>
      </div>
    </div>
  );
}

export default ColorMatch;
