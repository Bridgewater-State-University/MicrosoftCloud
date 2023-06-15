//import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import { initializeIcons } from '@fluentui/react/lib/Icons';
import './index.css';

ReactDOM.render(
  <div className="acs-wrapper">
    <App />
  </div>,
  document.getElementById('acs-app')
);

initializeIcons();
