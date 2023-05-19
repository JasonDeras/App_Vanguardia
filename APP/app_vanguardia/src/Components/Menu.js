import React from 'react';
import '../Styles/Menu.css';

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu">
        <a href="/chatbot" className="menu-link">Chat Bot</a>
        <a href="/profile" className="menu-link">Profile</a>
        <a href="/home" className="menu-link">Home</a>
      </div>
    </div>
  );
};

export default Menu;
