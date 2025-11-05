import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">🎓 Bienvenue sur EduFun</h1>
      <p className="text-lg text-gray-700 mb-6">Choisis une activité :</p>
      <div className="space-y-4">
        <Link to="/game" className="text-xl bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400 transition">🎮 Jeux éducatifs</Link>
        <Link to="/chatbot" className="text-xl bg-green-300 text-white px-4 py-2 rounded hover:bg-green-400 transition">🤖 Chatbot IA</Link>
        <Link to="/student" className="text-xl bg-pink-300 text-white px-4 py-2 rounded hover:bg-pink-400 transition">🧒 Espace enfant</Link>
      </div>
    </div>
  );
}

export default Home;
