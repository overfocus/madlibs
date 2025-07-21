import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import BotsonMadlib from './BotsonMadlib';
import HomePage from './HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai-hype" element={<App />} />
        <Route path="/botson" element={<BotsonMadlib />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
