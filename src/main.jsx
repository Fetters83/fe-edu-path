/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App'

import './index.css'
import { BrowserRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </React.StrictMode>,
)