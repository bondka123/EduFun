import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gameStyles.css';

function MemoryGame() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const emojis = ['🍎', '🍎', '🍊', '🍊', '🍌', '🍌', '🍓', '🍓', '🍉', '🍉', '🦋', '🦋'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setMoves(0);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setScore(score + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setTimeout(() => {
        alert(`🎉 Bravo! Tu as gagné! Score: ${score}`);
        initializeGame();
      }, 500);
    }
  }, [matched]);

  const handleCardClick = (index) => {
    if (!flipped.includes(index) && !matched.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">🎴 Jeu de Mémoire</h1>
        <div className="game-stats">
          <div className="stat-box">Score: <span className="stat-value">{score}</span></div>
          <div className="stat-box">Mouvements: <span className="stat-value">{moves}</span></div>
        </div>
      </div>

      <div className="memory-grid">
        {cards.map((emoji, index) => (
          <button
            key={index}
            className={`memory-card ${
              flipped.includes(index) || matched.includes(index) ? 'flipped' : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{emoji}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="game-controls">
        <button className="btn-secondary" onClick={initializeGame}>
          🔄 Recommencer
        </button>
        <button className="btn-secondary" onClick={() => navigate('/game')}>
          ← Retour
        </button>
      </div>
    </div>
  );
}

export default MemoryGame;
