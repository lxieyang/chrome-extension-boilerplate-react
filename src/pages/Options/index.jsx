import React from 'react';
import { createRoot } from 'react-dom/client';

import Options from './Options';
import './index.css';

const rootDiv = document.querySelector('#app-container');
const root = createRoot(rootDiv);

root.render(<Options title={'Settings'} />);
