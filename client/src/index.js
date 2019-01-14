import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { API_BASE } from './config';

console.log('Using API base ' + API_BASE);

ReactDOM.render(<App />, document.getElementById('root'));