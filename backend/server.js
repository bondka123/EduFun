const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes fictives pour tester la connexion avec le frontend
app.post('/api/login', (req, res) => {
  const { email } = req.body;
  res.json({ email, role: 'student' }); // ou 'teacher' selon le test
});

app.post('/api/register', (req, res) => {
  res.json({ message: 'Inscription réussie' });
});

app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  res.json({ reply: `Réponse IA simulée à: "${message}"` });
});

app.listen(5000, () => {
  console.log('✅ Backend lancé sur http://localhost:5000');
});
