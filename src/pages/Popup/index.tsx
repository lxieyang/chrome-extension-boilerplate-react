import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';

const container = document.getElementById('app-container');

if (container == null) {
    throw new Error('Newtab container is nullish');
}

const root = createRoot(container);
root.render(<Popup />);
