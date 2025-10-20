import React from 'react';
import { createRoot } from 'react-dom/client';

import Panel from './Panel';
import './index.css';

const container = document.getElementById('app-container');

if (container == null) {
    throw new Error('Panel container is nullish');
}

const root = createRoot(container);
root.render(<Panel />);
