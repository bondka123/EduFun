import React, { useState } from 'react';
import api from '../services/api';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const res = await api.post('/chatbot', { message: input });
    setMessages([...messages, { user: input }, { bot: res.data.reply }]);
    setInput('');
  };

  return (
    <div>
      <h2>Chatbot IA</h2>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <p key={i} className={msg.user ? 'user-msg' : 'bot-msg'}>
            {msg.user || msg.bot}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Pose ta question..."
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}

export default Chatbot;
