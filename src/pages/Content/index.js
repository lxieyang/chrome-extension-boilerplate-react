import { printLine } from './modules/print';

function checkElementInView() {
    var textElements = document.querySelectorAll('span[data-text="true"]');
    try {
        if (textElements.length > 0) {
            let textString = "";
            textElements.forEach(function (element) {
                textString = textString + element.innerHTML + "\n";
            });
            chrome.storage.local.set({ "bsPostText": textString }, function () {
                //console.log(textString);
            });
        } else {
            chrome.storage.local.set({ "bsPostText": "" }, function () {
                //console.log(textString);
            });
        }
    } catch { }

}

// 1秒ごとに要素の表示状態を確認する
setInterval(checkElementInView, 1000);
