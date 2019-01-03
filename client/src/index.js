import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const API_BASE = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api' : 'https://todoapi.danielgulic.com/api';

export { API_BASE };

ReactDOM.render(<App />, document.getElementById('root'));