import "./info.scss";

import * as SDK from "azure-devops-extension-sdk";
import {
  getClient,
  CommonServiceIds,
  IProjectInfo,
} from "azure-devops-extension-api";
import {
  GitRestClient,
  GitRepositoryCreateOptions
} from "azure-devops-extension-api/Git";
import {
  CoreRestClient, WebApiTeam
} from "azure-devops-extension-api/Core"
// import {
//   WorkItemTrackingRestClient
// } from "azure-devops-extension-api/WorkItemTracking";
import {
  GraphRestClient,
  GraphSubjectQuery
} from "azure-devops-extension-api/Graph"

var currentProject: IProjectInfo | undefined;

function initSdk(): void {
  console.log("Initializing SDK");

  SDK.init();

  SDK.ready().then(async function () {
    console.log("SDK is ready");

    await doStuff();
  });
}

async function doStuff() {
  let currentUser = SDK.getUser();
  console.log(currentUser);

  let graphClient = getClient(GraphRestClient);

  let user = await graphClient.getUser(currentUser.descriptor);
  (document.body.querySelector("#user-info") as HTMLParagraphElement).textContent = JSON.stringify({
    "name": user.displayName,
    "type": user.subjectKind,
    "principal-name": user.principalName,
    "mail-address": user.mailAddress
  }, null, 2);

  let coreClient = getClient(CoreRestClient);
  let myTeams: WebApiTeam[] = await coreClient.getAllTeams(true);
  (document.body.querySelector("#my-teams-info") as HTMLParagraphElement).textContent = JSON.stringify(myTeams.map(team => {
    return {
      "project-name": team.projectName,
      "team-name": team.name,
      "description": team.description
    };
  }), null, 2);

  let allTeams: WebApiTeam[] = await coreClient.getAllTeams(undefined, undefined, undefined, false);
  (document.body.querySelector("#all-teams-info") as HTMLParagraphElement).textContent = JSON.stringify(allTeams.map(team => {
    return {
      "team-name": team.name,
      "description": team.description,
      "project-name": team.projectName
    };
  }), null, 2);

  // MEMBERSHIPS
  // let memberships = await graphClient.listMemberships(currentUser.descriptor);
  // (document.body.querySelector("#user-info") as HTMLParagraphElement).textContent = JSON.stringify(memberships, null, 2);
  // graphClient.querySubjects({ query: "" })

  // const result = await getClient(BuildRestClient).getDefinition(context.project.id, context.id, undefined, undefined, undefined, true);

  // PROJECTS
  // const projects = await getClient(CoreRestClient).getProjects();
  // console.log(projects);

  // WORK ITEM TYPES
  // let workItemTypeNames: string[];

  // const client = getClient(WorkItemTrackingRestClient);
  // const types = await client.getWorkItemTypes(currentProject!.id);
  // workItemTypeNames = types.map(t => t.name);
  // console.log(workItemTypeNames);
}

// INIT
initSdk();