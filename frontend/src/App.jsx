import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import GameModes from './pages/GameModes';
import MemoryGame from './pages/MemoryGame';
import ColorMatch from './pages/ColorMatch';
import CountingGame from './pages/CountingGame';
import AnimalGame from './pages/AnimalGame';
import ShapeGame from './pages/ShapeGame';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/teacher" element={
          <ProtectedRoute role="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/game" element={<GameModes />} />
        <Route path="/game/memory" element={<MemoryGame />} />
        <Route path="/game/colors" element={<ColorMatch />} />
        <Route path="/game/counting" element={<CountingGame />} />
        <Route path="/game/animals" element={<AnimalGame />} />
        <Route path="/game/shapes" element={<ShapeGame />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
