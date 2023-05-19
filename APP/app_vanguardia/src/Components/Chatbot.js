import React, { useState } from 'react';
import '../Styles/Chatbot.css'

const ChatBotPage = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any logic to handle the submitted question
    // and generate the response from the chat bot
    // For simplicity, let's just set a static response
    setResponse("This is the response from the chat bot!");
    setQuestion('');
  };

  return (
    <div className="chat-bot-page">
      <h2 className="welcome-message">Welcome to the Chat Bot Page</h2>
      <div className="chat-container">
        <div className="response">{response}</div>
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBotPage;
