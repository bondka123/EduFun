import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gameStyles.css';

function ColorGame() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentColor, setCurrentColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const colors = [
    { name: 'Rouge', hex: '#FF0000' },
    { name: 'Bleu', hex: '#0000FF' },
    { name: 'Vert', hex: '#00FF00' },
    { name: 'Jaune', hex: '#FFFF00' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Violet', hex: '#800080' },
    { name: 'Rose', hex: '#FFC0CB' },
    { name: 'Marron', hex: '#8B4513' },
    { name: 'Gris', hex: '#808080' },
    { name: 'Noir', hex: '#000000' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(randomColor);

    const randomOptions = [randomColor];
    while (randomOptions.length < 3) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (!randomOptions.find(c => c.name === color.name)) {
        randomOptions.push(color);
      }
    }

    setOptions(randomOptions.sort(() => Math.random() - 0.5));
    setAnswered(false);
    setCorrect(false);
  };

  const handleColorClick = (selectedColor) => {
    setAnswered(true);
    if (selectedColor.name === currentColor.name) {
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
        <h1 className="game-title">🎨 Les Couleurs</h1>
        <div className="game-stats">
          <div className="stat-box">Score: <span className="stat-value">{score}</span></div>
          <div className="stat-box">Niveau: <span className="stat-value">{level}</span></div>
        </div>
      </div>

      <div className="color-content">
        <div className="color-instruction">
          <p className="instruction-text">Clique sur la couleur :</p>
          <p className="color-name" style={{ fontSize: '28px', fontWeight: 'bold' }}>
            {currentColor?.name}
          </p>
        </div>

        <div className="color-options">
          {options.map((color) => (
            <button
              key={color.name}
              className={`color-button ${
                answered && color.name === currentColor.name ? 'correct' : ''
              } ${answered && color.name !== currentColor.name ? 'incorrect' : ''}`}
              onClick={() => !answered && handleColorClick(color)}
              disabled={answered}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        {answered && correct && (
          <div className="feedback positive">
            ✅ Bravo! C'était bien {currentColor.name}!
          </div>
        )}

        {answered && !correct && (
          <div className="feedback negative">
            ❌ Mauvaise réponse! C'était {currentColor.name}
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

export default ColorGame;
