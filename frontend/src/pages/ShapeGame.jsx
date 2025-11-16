import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gameStyles.css';

function ShapeGame() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentShape, setCurrentShape] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const shapes = [
    { emoji: '⭕', name: 'Cercle', description: 'Rond' },
    { emoji: '🔷', name: 'Carré', description: 'Carré' },
    { emoji: '🔺', name: 'Triangle', description: 'Triangle' },
    { emoji: '⭐', name: 'Étoile', description: 'Étoile' },
    { emoji: '❤️', name: 'Cœur', description: 'Cœur' },
    { emoji: '⬛', name: 'Rectangle', description: 'Rectangle' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    setCurrentShape(randomShape);
    
    const randomShapes = [randomShape];
    while (randomShapes.length < Math.min(level + 2, shapes.length)) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      if (!randomShapes.find(s => s.name === shape.name)) {
        randomShapes.push(shape);
      }
    }
    
    setOptions(randomShapes.sort(() => Math.random() - 0.5));
    setAnswered(false);
    setCorrect(false);
  };

  const handleShapeClick = (selectedShape) => {
    setAnswered(true);
    if (selectedShape.name === currentShape.name) {
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
        <h1 className="game-title">🔶 Les Formes</h1>
        <div className="game-stats">
          <div className="stat-box">Score: <span className="stat-value">{score}</span></div>
          <div className="stat-box">Niveau: <span className="stat-value">{level}</span></div>
        </div>
      </div>

      <div className="shape-content">
        <div className="shape-instruction">
          <p className="instruction-text">Clique sur la forme :</p>
          <div className="shape-display">
            {currentShape && (
              <>
                <div className="shape-emoji-large">{currentShape.emoji}</div>
                <p className="shape-description">{currentShape.description}</p>
              </>
            )}
          </div>
        </div>

        <div className="shape-options">
          {options.map((shape) => (
            <button
              key={shape.name}
              className={`shape-button ${
                answered && shape.name === currentShape.name ? 'correct' : ''
              } ${answered && shape.name !== currentShape.name ? 'incorrect' : ''}`}
              onClick={() => !answered && handleShapeClick(shape)}
              disabled={answered}
            >
              <span className="shape-button-emoji">{shape.emoji}</span>
              <span className="shape-button-name">{shape.name}</span>
            </button>
          ))}
        </div>

        {answered && correct && (
          <div className="feedback positive">
            ✅ Bravo! C'est {currentShape.name}!
          </div>
        )}

        {answered && !correct && (
          <div className="feedback negative">
            ❌ Essaie encore! C'est {currentShape.name}
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

export default ShapeGame;
