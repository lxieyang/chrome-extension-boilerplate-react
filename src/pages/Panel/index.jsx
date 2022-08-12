import React from 'react';
import * as ReactDOM from 'react-dom/client';

import Panel from './Panel';
import './index.css';

const rootDiv = document.querySelector('#app-container');
const root = ReactDOM.createRoot(rootDiv);

root.render(<Panel />);
