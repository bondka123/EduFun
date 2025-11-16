import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/gameStyles.css';

function AnimalGame() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const animals = [
    { emoji: '🐱', name: 'Chat', sound: 'Miaou!' },
    { emoji: '🐶', name: 'Chien', sound: 'Ouaf!' },
    { emoji: '🐄', name: 'Vache', sound: 'Meuh!' },
    { emoji: '🐷', name: 'Cochon', sound: 'Oink!' },
    { emoji: '🦆', name: 'Canard', sound: 'Coin coin!' },
    { emoji: '🦌', name: 'Cerf', sound: 'Brame!' },
    { emoji: '🦁', name: 'Lion', sound: 'Rugit!' },
    { emoji: '🐯', name: 'Tigre', sound: 'Grogne!' },
    { emoji: '🐸', name: 'Grenouille', sound: 'Coassement!' },
    { emoji: '🐢', name: 'Tortue', sound: 'Silence' },
  ];

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    setCurrentAnimal(randomAnimal);
    
    const randomAnimals = [randomAnimal];
    while (randomAnimals.length < Math.min(level + 2, animals.length)) {
      const animal = animals[Math.floor(Math.random() * animals.length)];
      if (!randomAnimals.find(a => a.name === animal.name)) {
        randomAnimals.push(animal);
      }
    }
    
    setOptions(randomAnimals.sort(() => Math.random() - 0.5));
    setAnswered(false);
    setCorrect(false);
  };

  const handleAnimalClick = (selectedAnimal) => {
    setAnswered(true);
    if (selectedAnimal.name === currentAnimal.name) {
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
        <h1 className="game-title">🐾 Les Animaux</h1>
        <div className="game-stats">
          <div className="stat-box">Score: <span className="stat-value">{score}</span></div>
          <div className="stat-box">Niveau: <span className="stat-value">{level}</span></div>
        </div>
      </div>

      <div className="animal-content">
        <div className="animal-instruction">
          <p className="instruction-text">Clique sur l'animal :</p>
          <div className="animal-display">
            {currentAnimal && (
              <>
                <div className="animal-emoji-large">{currentAnimal.emoji}</div>
                <p className="animal-sound">{currentAnimal.sound}</p>
              </>
            )}
          </div>
        </div>

        <div className="animal-options">
          {options.map((animal) => (
            <button
              key={animal.name}
              className={`animal-button ${
                answered && animal.name === currentAnimal.name ? 'correct' : ''
              } ${answered && animal.name !== currentAnimal.name ? 'incorrect' : ''}`}
              onClick={() => !answered && handleAnimalClick(animal)}
              disabled={answered}
            >
              <span className="animal-button-emoji">{animal.emoji}</span>
              <span className="animal-button-name">{animal.name}</span>
            </button>
          ))}
        </div>

        {answered && correct && (
          <div className="feedback positive">
            ✅ Bravo! C'est {currentAnimal.name}!
          </div>
        )}

        {answered && !correct && (
          <div className="feedback negative">
            ❌ Essaie encore! C'est {currentAnimal.name}
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

export default AnimalGame;
