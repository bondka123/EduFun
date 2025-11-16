import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AIService from '../services/aiService';
import '../styles/chatbotStyles.css';

function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [performance, setPerformance] = useState(null);
  const [tab, setTab] = useState('chat'); // 'chat', 'analysis', 'recommendations'

  // Charger les données utilisateur au montage
  useEffect(() => {
    // Simuler des données de jeu (en production, viendrait du backend)
    const mockGameData = [
      { type: 'memory', score: 85, time: 45, mistakes: 2 },
      { type: 'colors', score: 90, time: 30, mistakes: 1 },
      { type: 'counting', score: 75, time: 60, mistakes: 3 },
      { type: 'animals', score: 95, time: 25, mistakes: 0 },
      { type: 'memory', score: 70, time: 50, mistakes: 4 },
    ];

    const analysis = AIService.analyzePerformance(mockGameData);
    setPerformance(analysis);

    // Message initial du chatbot
    const welcomeMessage = {
      id: 1,
      sender: 'bot',
      text: '👋 Bonjour! Je suis ton assistant IA! Je peux t\'aider avec les jeux, répondre à tes questions, et te donner des conseils pour progresser. Comment puis-je t\'aider? 😊',
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  }, []);

  // Traiter l'envoi de message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: userInput,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setUserInput('');
    setIsLoading(true);

    // Simuler la réponse de l'IA (délai de 1s)
    setTimeout(() => {
      const response = AIService.answerQuestion(userInput);
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Onglet: Chat
  const renderChat = () => (
    <div className="chatbot-content">
      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className={`message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
            <div className="message-time">
              {msg.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-bubble bot">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Pose une question... 💬"
          className="message-input"
        />
        <button type="submit" className="send-button" disabled={!userInput.trim()}>
          ➤
        </button>
      </form>
    </div>
  );

  // Onglet: Analyse des Performances
  const renderAnalysis = () => (
    <div className="analysis-content">
      {performance ? (
        <>
          <div className="analysis-header">
            <h2>📊 Ton Analyse</h2>
            <div className={`level-badge ${performance.level}`}>
              {performance.level.toUpperCase()}
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🎮</div>
              <div className="stat-label">Jeux Joués</div>
              <div className="stat-value">{performance.totalGames}</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-label">Points Totaux</div>
              <div className="stat-value">{performance.totalScore}</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">📈</div>
              <div className="stat-label">Score Moyen</div>
              <div className="stat-value">{performance.averageScore}</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-label">Taux de Réussite</div>
              <div className="stat-value">{performance.successRate}%</div>
            </div>
          </div>

          <div className="game-performance">
            <h3>📋 Performance par Jeu</h3>
            <div className="performance-list">
              {performance.gamePerformance && performance.gamePerformance.map((game, idx) => (
                <div key={idx} className="performance-item">
                  <div className="game-name">{game.type}</div>
                  <div className="performance-bar">
                    <div 
                      className="performance-fill" 
                      style={{ width: `${game.average}%` }}
                    ></div>
                  </div>
                  <div className="performance-score">{game.average}%</div>
                </div>
              ))}
            </div>
          </div>

          {performance.strengths.length > 0 && (
            <div className="insights">
              <h3>💪 Tes Points Forts</h3>
              <div className="strengths-list">
                {performance.strengths.map((strength, idx) => (
                  <div key={idx} className="strength-item">
                    ✨ {strength}
                  </div>
                ))}
              </div>
            </div>
          )}

          {performance.weaknesses.length > 0 && (
            <div className="insights">
              <h3>🎯 À Améliorer</h3>
              <div className="weaknesses-list">
                {performance.weaknesses.map((weakness, idx) => (
                  <div key={idx} className="weakness-item">
                    📚 {weakness}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="no-data">Pas encore de données. Joue aux jeux d'abord! 🎮</p>
      )}
    </div>
  );

  // Onglet: Recommandations
  const renderRecommendations = () => (
    <div className="recommendations-content">
      {performance ? (
        <>
          <h2>🎯 Recommandations Personnalisées</h2>

          <div className="recommendations-list">
            {AIService.generateRecommendations(performance).map((rec, idx) => (
              <div key={idx} className={`recommendation-card priority-${rec.priority}`}>
                <div className="rec-header">
                  <span className="rec-type">
                    {rec.type === 'practice' && '🏋️'}
                    {rec.type === 'challenge' && '🏆'}
                    {rec.type === 'strength' && '💪'}
                    {rec.type === 'improvement' && '📚'}
                    {rec.type === 'variety' && '🌟'}
                  </span>
                  <span className="rec-priority">{rec.priority}</span>
                </div>
                <div className="rec-message">{rec.message}</div>
                <button className="rec-action-btn">
                  {rec.action} →
                </button>
              </div>
            ))}
          </div>

          <div className="tips-section">
            <h2>💡 Conseils Personnalisés</h2>
            <div className="tips-list">
              {AIService.generatePersonalizedTip(performance).map((tip, idx) => (
                <div key={idx} className="tip-card">
                  <div className="tip-title">{tip.title}</div>
                  <div className="tip-content">{tip.content}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="next-game-suggestion">
            <h3>🎮 Jeu Recommandé Ensuite</h3>
            <p>Le jeu idéal pour toi maintenant:</p>
            <button className="game-btn">
              {AIService.suggestNextGame(performance)} →
            </button>
          </div>
        </>
      ) : (
        <p className="no-data">Pas encore de recommandations. Joue d'abord! 🎮</p>
      )}
    </div>
  );

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>🤖 Assistant IA</h1>
        <p>Assistance 24/7 pour progresser</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${tab === 'chat' ? 'active' : ''}`}
          onClick={() => setTab('chat')}
        >
          💬 Chat
        </button>
        <button
          className={`tab-button ${tab === 'analysis' ? 'active' : ''}`}
          onClick={() => setTab('analysis')}
        >
          📊 Analyse
        </button>
        <button
          className={`tab-button ${tab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setTab('recommendations')}
        >
          🎯 Recommandations
        </button>
      </div>

      <div className="tabs-content">
        {tab === 'chat' && renderChat()}
        {tab === 'analysis' && renderAnalysis()}
        {tab === 'recommendations' && renderRecommendations()}
      </div>

      <div className="chatbot-footer">
        <button className="btn-back" onClick={() => navigate('/')}>
          🏠 Retour
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
