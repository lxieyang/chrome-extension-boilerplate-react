import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");



const calculatorPopulationMapping = [
    { "#right-temporally": 80 },
    { "#right-down-temporally": 80 },
    { "#right-down": 60 },
    { "#right-down-nasally": 45 },
    { "#right-nasally": 55 },
    { "#right-up-nasally": 50 },
    { "#right-up": 40 },
    { "#right-up-temporally": 60 },
    { "#right-distanceTop": 20 },
    { "#right-distanceBottom": 70 },
    { "#right-nearTop": 20 },
    { "#right-nearBottom": 100 },
    { "#right-eyeIsNSC": false },
    { "#right-aphakiaOrCrystallineLensDislocation": false },
    { "#right-lossType-anatomical-loss": false },
    { "#right-lossType-light-perception-only": false },
    { "#right-lossType-no-light-perception": false },
    { "#left-temporally": 90 },
    { "#left-down-temporally": 90 },
    { "#left-down": 70 },
    { "#left-down-nasally": 55 },
    { "#left-nasally": 65 },
    { "#left-up-nasally": 60 },
    { "#left-up": 50 },
    { "#left-up-temporally": 65 },
    { "#left-distanceTop": 20 },
    { "#left-distanceBottom": 200 },
    { "#left-nearTop": 20 },
    { "#left-nearBottom": 200 },
    { "#left-eyeIsNSC": false },
    { "#left-aphakiaOrCrystallineLensDislocation": false },
    { "#left-lossType-anatomical-loss": false },
    { "#left-lossType-light-perception-only": false },
    { "#left-lossType-no-light-perception": false }
];

for (const mapping of calculatorPopulationMapping) {
    console.log(mapping)
}