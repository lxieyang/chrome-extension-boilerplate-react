

// const main = () => {
//     chrome.storage.sync.get('data', function (items) {
//       let redos = items.data;
//       printLine('Checking for Notifications');
//         for(let i = 0; i < redos.length; i++) {
//           const reminderDate = new Date(redos[i].reminderDate);
//           console.log(`isToday: `, isToday(reminderDate));
//           if (isToday(reminderDate) || isPast(reminderDate)) {
//             console.log(`${redos[i].id} isToday`)
//             var opt = {
//               type: "basic",
//               title: "Primary Title",
//               message: "Primary message to display",
//               iconUrl: "url_to_small_icon"
//             }
            
//             chrome.notifications.create(redos[i].uri, opt);
//             return;
//           }
//         }
//     });
//   }
  
//   main();
// console.log("Please wait...");
// chrome.runtime.onInstalled.addListener((reason) => {
//     chrome.runtime.onInstalled.addListener(function(details){
//         if(details.reason == "install"){
//             //call a function to handle a first install
//             console.log("install")
//         }else if(details.reason == "update"){
//             //call a function to handle an update
//             console.log("update")
//         }
//     });
//   });