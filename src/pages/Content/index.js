import { printLine } from './modules/print';
import {createRoot} from "react-dom/client";
import React from "react";
import RangeHeader from "../../DateRangeContent/RangeHeader";


console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");


let element;

let interval = setInterval(() => {
    element = document.querySelector("#etf-about-header");
    if(element) {
        const root = createRoot(element); // createRoot(container!) if you use TypeScript
        root.render(<RangeHeader />);
        clearInterval(interval);
    }
}, 5000);
