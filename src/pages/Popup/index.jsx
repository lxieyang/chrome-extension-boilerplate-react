import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';

// Root render function
const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Popup />);
