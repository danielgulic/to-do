import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import { API_BASE } from './config';

console.log('Using API base ' + API_BASE);

ReactDOM.render(<SnackbarProvider maxSnack={3}><App /></SnackbarProvider>, document.getElementById('root'));