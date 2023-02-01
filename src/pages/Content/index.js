import { printLine } from './modules/print';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Content from './Content';
import './index.css';
import ContentContainer from '../../components/ContentContainer';


console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

// Put content app in shadow DOM so we can encapsulate the style (otherwise it inherits from page)
const newDiv = document.createElement('div');
// Set to initial to ignore all CSS above it
newDiv.setAttribute('style', 'all: initial;');
const shadow = newDiv.attachShadow({ mode: "open" });
const linkElem = document.createElement("link");
linkElem.setAttribute("rel", "stylesheet");
const linkUrl = chrome.runtime.getURL("tailwind.css");
console.log(linkUrl)
linkElem.setAttribute("href", linkUrl);
shadow.appendChild(linkElem);
document.body.appendChild(newDiv);
// The following renders.
//const testSpan = document.createElement('span');
//testSpan.innerText = "Hello from the shadow DOM!";
//shadow.appendChild(testSpan);
const root = createRoot(shadow); // createRoot(container!) if you use TypeScript
// This works.
//const popup = React.createElement(() => <span>Inside of React!</span>, {});
const popup = React.createElement(() => <ContentContainer><Content/></ContentContainer>, {});
root.render(popup);
