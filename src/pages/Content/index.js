// enable sass
import './content.styles.scss';

// ingest XML
const staticVisionMapping = [
    { "right-temporally": 80 },
    { "right-down-temporally": 80 },
    { "right-down": 60 },
    { "right-down-nasally": 45 },
    { "right-nasally": 55 },
    { "right-up-nasally": 50 },
    { "right-up": 40 },
    { "right-up-temporally": 60 },
    { "right-distanceTop": 20 },
    { "right-distanceBottom": 70 },
    { "right-nearTop": 20 },
    { "right-nearBottom": 100 },
    { "right-eyeIsNSC": false },
    { "right-aphakiaOrCrystallineLensDislocation": false },
    { "right-lossType-anatomical-loss": false },
    { "right-lossType-light-perception-only": false },
    { "right-lossType-no-light-perception": false },
    { "left-temporally": 90 },
    { "left-down-temporally": 90 },
    { "left-down": 70 },
    { "left-down-nasally": 55 },
    { "left-nasally": 65 },
    { "left-up-nasally": 60 },
    { "left-up": 50 },
    { "left-up-temporally": 65 },
    { "left-distanceTop": 20 },
    { "left-distanceBottom": 200 },
    { "left-nearTop": 20 },
    { "left-nearBottom": 200 },
    { "left-eyeIsNSC": false },
    { "left-aphakiaOrCrystallineLensDislocation": false },
    { "left-lossType-anatomical-loss": false },
    { "left-lossType-light-perception-only": false },
    { "left-lossType-no-light-perception": false }
];

// instantiate hyperpop encapsulating HTML object
var dbqXmlPicker = document.createElement("aside");
// set id
dbqXmlPicker.setAttribute('id', "hyperpop")
// find first title on page
var titleElement = document.getElementsByClassName('vision-calculator__title')[0];
// append aside to DOM
titleElement.after(dbqXmlPicker);

// fetch contents of file picker UI
fetch(chrome.runtime.getURL('/filepicker.html'))
    // parse response contents
    .then(response => response.text())
    // pass response contents for injection
    .then(data => {
        // inject
        document.getElementById('hyperpop').innerHTML = data;
        // other code
        // eg update injected elements,
        // add event listeners or logic to connect to other parts of the app
    }).catch(err => {
        // handle error
        console.log(Error)
    });

// nastily drop in data.
for (const mapping of staticVisionMapping) {
    var populatingFieldID = Object.keys(mapping)[0];
    var populatingValue = mapping[Object.keys(mapping)[0]]
    let populatingField = document.getElementById(populatingFieldID)
    if (populatingField) {
        populatingField.value = populatingValue
    }
}
