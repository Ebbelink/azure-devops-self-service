// import SDK = require("azure-devops-extension-sdk");
import "./access-control-style.scss";

import * as SDK from "azure-devops-extension-sdk";

console.log("AccessControl hit");

function initPage() {
  console.log("Initializing page");
  SDK.init();
  SDK.notifyLoadSucceeded().then(() => {
    alert("success");
  }, (errReason) => {
    alert(`Failed ${errReason}`);
  }).catch();
  SDK.notifyLoadFailed("SDK did not load");
}
initPage();

// // private async getTeams() {
// //     const client = getClient(CoreRestClient);

// //     client.getTeams(SDK.getWebContext().project.id).then(
// //         function(teams) {
// //             console.log(teams);
// //         }
// //     );
// // }
