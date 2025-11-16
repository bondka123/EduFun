import { Link } from 'react-router-dom';
import '../styles/homeStyles.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo-area">
          <div className="logo-emoji">🎓</div>
          <h1 className="home-title">EduFun</h1>
        </div>
        <p className="home-subtitle">Apprendre en s'amusant!</p>
      </div>

      <div className="cards-grid">
        <Link to="/game" className="home-card games-card">
          <div className="card-emoji">🎮</div>
          <h2>Jeux Éducatifs</h2>
          <p>Joue et apprends!</p>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/student" className="home-card student-card">
          <div className="card-emoji">🧒</div>
          <h2>Mon Espace</h2>
          <p>Vu tes progrès!</p>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/chatbot" className="home-card chat-card">
          <div className="card-emoji">🤖</div>
          <h2>Chatbot IA</h2>
          <p>Pose tes questions!</p>
          <div className="card-arrow">→</div>
        </Link>

        <Link to="/teacher" className="home-card teacher-card">
          <div className="card-emoji">👨‍🏫</div>
          <h2>Espace Enseignant</h2>
          <p>Gère les jeux</p>
          <div className="card-arrow">→</div>
        </Link>
      </div>

      <div className="footer-text">
        <p>Fait pour les enfants de 4 à 6 ans</p>
      </div>
    </div>
  );
}

export default Home;
