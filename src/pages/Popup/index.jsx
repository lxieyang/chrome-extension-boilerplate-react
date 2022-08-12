import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';


const rootDiv = document.querySelector('#app-container');
const root = createRoot(rootDiv);

root.render(<Popup />);
