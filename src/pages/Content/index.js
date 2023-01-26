import { printLine } from './modules/print';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';


console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

// Create new div attached to body
const newDiv = document.createElement('div');
document.body.appendChild(newDiv);
const root = createRoot(newDiv); // createRoot(container!) if you use TypeScript
const popup = React.createElement(Popup, {});
root.render(popup);
