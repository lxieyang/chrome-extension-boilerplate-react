import './content.styles.scss';


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

// instantiate input HTML object
var dbqXmlPicker = document.createElement("aside");
// set input attribute type
dbqXmlPicker.setAttribute('id',"hyperpop")
// get first title on page
var titleElement = document.getElementsByClassName('vision-calculator__title')[0];
// append
titleElement.after(dbqXmlPicker); 


fetch(chrome.runtime.getURL('/filepicker.html'))
.then(response => response.text())
.then(data => {
    document.getElementById('hyperpop').innerHTML = data;
    // other code
    // eg update injected elements,
    // add event listeners or logic to connect to other parts of the app
}).catch(err => {
    // handle error
    console.log(Error)
});




for (const mapping of staticVisionMapping) {
    var populatingFieldID = Object.keys(mapping)[0];
    var populatingValue = mapping[Object.keys(mapping)[0]]
    let populatingField = document.getElementById(populatingFieldID)
    if(populatingField) {
        populatingField.value = populatingValue
    }
}