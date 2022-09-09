import React from 'react';
import { createRoot } from 'react-dom/client';

import Newtab from './Newtab';
import './index.css';

const container = window.document.querySelector('#app-container');
const root = createRoot(container);
root.render(<Newtab />);

if (module.hot) module.hot.accept();
