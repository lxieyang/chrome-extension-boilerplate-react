import React from 'react';
import { createRoot } from 'react-dom/client';

import Options from './Options';
import './index.css';

const container = document.getElementById('app-container');

if (container == null) {
    throw new Error('Options container is nullish');
}

const root = createRoot(container);
root.render(<Options title='Settings' />);
