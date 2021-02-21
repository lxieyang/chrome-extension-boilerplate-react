import React from 'react';
import { render } from 'react-dom';

import Panel from './Panel';
import './index.css';

render(<Panel />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
