import "./access-control-style.scss";

import * as SDK from "azure-devops-extension-sdk";
import { IHostPageLayoutService, CommonServiceIds } from "azure-devops-extension-api";

console.log("AccessControl hit");

function initSdk() {
  console.log("Initializing SDK");

  SDK.init();

  SDK.ready().then(function () {
    console.log("SDK is ready");
  });

  SDK.notifyLoadSucceeded().then(() => {
    console.log("notify loaded succeeded");
  }, (errReason) => {
    console.error(`notify loaded failed: ${errReason.message}`);
  }).catch();
  SDK.notifyLoadFailed("SDK did not load");
}

let button: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#do-something");
button.addEventListener("click", () => { console.info("DO SOMETHING ") });

initSdk();

// private async getTeams() {
//     const client = getClient(CoreRestClient);

//     client.getTeams(SDK.getWebContext().project.id).then(
//         function(teams) {
//             console.log(teams);
//         }
//     );
// }
