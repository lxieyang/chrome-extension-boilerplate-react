import React from 'react';
import { createRoot } from 'react-dom/client';

import Options from '../../components/Options';
import '../../assets/styles/tailwind.css';
import './index.css';

const container = document.getElementById('app-container');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Options storage={chrome.storage.sync} />);
