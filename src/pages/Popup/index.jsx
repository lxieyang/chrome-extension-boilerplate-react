import React from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './Popup';
import './index.css';

const container = window.document.querySelector('#app-container');
const root = createRoot(container);
root.render(<Popup />);

if (module.hot) module.hot.accept();
