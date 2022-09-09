import React from 'react';
import { createRoot } from 'react-dom/client';

import Panel from './Panel';
import './index.css';

const container = window.document.querySelector('#app-container');
const root = createRoot(container);
root.render(<Panel />);

if (module.hot) module.hot.accept();
