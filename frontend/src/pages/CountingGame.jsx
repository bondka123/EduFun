import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gameStyles.css';

function CountingGame() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [items, setItems] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const itemEmojis = ['🍎', '🍊', '🍌', '🦋', '🐝', '🌟', '🎈', '🧸'];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const count = Math.floor(Math.random() * Math.min(level + 2, 10)) + 1;
    setItemCount(count);
    
    const randomEmoji = itemEmojis[Math.floor(Math.random() * itemEmojis.length)];
    const newItems = Array(count).fill(randomEmoji).map(() => ({
      id: Math.random(),
      emoji: randomEmoji
    }));
    
    setItems(newItems);
    setAnswered(false);
    setCorrect(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (answer === itemCount) {
      setCorrect(true);
      setScore(score + 10);
      setTimeout(() => {
        setLevel(level + 1);
      }, 1500);
    }
  };

  const options = (() => {
    const opts = new Set([itemCount]);
    while (opts.size < 4) {
      const random = Math.floor(Math.random() * 10) + 1;
      if (random !== itemCount) opts.add(random);
    }
    return Array.from(opts).sort(() => Math.random() - 0.5);
  })();

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">🔢 Compte les Objets</h1>
        <div className="game-stats">
          <div className="stat-box">Score: <span className="stat-value">{score}</span></div>
          <div className="stat-box">Niveau: <span className="stat-value">{level}</span></div>
        </div>
      </div>

      <div className="counting-content">
        <p className="instruction-text">Combien en vois-tu?</p>
        
        <div className="items-display">
          {items.map((item) => (
            <span key={item.id} className="item-emoji">{item.emoji}</span>
          ))}
        </div>

        <div className="counting-options">
          {options.map((option) => (
            <button
              key={option}
              className={`number-button ${
                selectedAnswer === option && correct ? 'correct' : ''
              } ${
                selectedAnswer === option && !correct ? 'incorrect' : ''
              }`}
              onClick={() => !answered && handleAnswer(option)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>

        {answered && correct && (
          <div className="feedback positive">
            ✅ Excellent! C'est {itemCount}!
          </div>
        )}

        {answered && !correct && (
          <div className="feedback negative">
            ❌ Essaie encore! La réponse était {itemCount}
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

export default CountingGame;
