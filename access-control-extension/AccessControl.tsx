import { getClient } from "azure-devops-extension-api";
import { CoreRestClient } from "azure-devops-extension-api/Core";
import * as SDK from "azure-devops-extension-sdk";

private async getTeams() {
    const client = getClient(CoreRestClient);
    
    client.getTeams(SDK.getWebContext().project.id).then(
        function(teams) {
            console.log(teams);
        }
    );
}