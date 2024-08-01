import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure this matches index.html

root.render(
  <Router>
    <App />
  </Router>
);

