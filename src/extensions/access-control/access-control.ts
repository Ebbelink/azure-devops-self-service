import "./access-control.scss";

import * as SDK from "azure-devops-extension-sdk";
import {
  getClient,
  IGlobalMessagesService,
  CommonServiceIds,
  MessageBannerLevel,
  IProjectPageService,
  IProjectInfo,
} from "azure-devops-extension-api";
import {
  GitRestClient,
  GitRepositoryCreateOptions
} from "azure-devops-extension-api/Git";
import {
  CoreRestClient
} from "azure-devops-extension-api/Core"
import {
  WorkItemTrackingRestClient
} from "azure-devops-extension-api/WorkItemTracking";

var currentProject: IProjectInfo | undefined;

function initSdk(): void {
  console.log("Initializing SDK");

  SDK.init();

  SDK.ready().then(async function () {
    console.log("SDK is ready");

    document.body.querySelector("#name")!.innerHTML = SDK.getUser().name;

    let projectService = await SDK.getService<IProjectPageService>(
      CommonServiceIds.ProjectPageService
    );
    currentProject = await projectService.getProject();

    document.body.querySelector("#project-name")!.innerHTML = currentProject!.name;

    // const result = await getClient(BuildRestClient).getDefinition(context.project.id, context.id, undefined, undefined, undefined, true);
    const projects = await getClient(CoreRestClient).getProjects();
    console.log(projects);

    let workItemTypeNames: string[];

    const client = getClient(WorkItemTrackingRestClient);
    const types = await client.getWorkItemTypes(currentProject!.id);
    workItemTypeNames = types.map(t => t.name);
    console.log(workItemTypeNames);

    // document.body.querySelector("#team-name")!.innerHTML = `(${SDK.getTeamContext().name})`;
  });
}

let showMessageBannerWithButtonsButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#show-banner-with-buttons");
showMessageBannerWithButtonsButton.addEventListener("click", showMessageBannerWithButtons);

let createRepoButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#create-repo");
createRepoButton.addEventListener("click", () => {
  let repoNameInput = <HTMLInputElement>document.body.querySelector("#repo-name");
  let ciInput = <HTMLInputElement>document.body.querySelector("#ci");
  createRepo(`${ciInput.value}.${repoNameInput.value}`);
});

async function createRepo(name: string): Promise<void> {
  const accessToken = await SDK.getAccessToken();

  var gitClient: GitRestClient = getClient(GitRestClient);
  console.log(gitClient.getRepositories("madailei"));

  const options = {} as GitRepositoryCreateOptions;
  options.name = name;

  if (!currentProject || !name) {
    console.error("Missing either project or repo name");
  }

  var repository = await gitClient.createRepository(options, currentProject!.name);
}

async function showMessageBannerWithButtons(): Promise<void> {
  const globalMessagesSvc = await SDK.getService<IGlobalMessagesService>(CommonServiceIds.GlobalMessagesService);
  globalMessagesSvc.addBanner({
    dismissable: false,
    customIcon: "LightningBolt",
    level: MessageBannerLevel.warning,
    message: "Some action needs to be performed. Do you wish to perform the action now?",
    buttons: [
      {
        text: "Yes",
        command: SDK.getExtensionContext().id + ".sample-service-yes-command",
        commandArguments: ["test1"]
      },
      {
        text: "No",
        command: SDK.getExtensionContext().id + ".sample-service-no-command",
        commandArguments: ["test2"],
      }
    ],
    helpInfo: {
      href: "https://www.starttoscaleit.nl/",
      tooltip: "This tooltip can display more information, on click it will go somewhere"
    }
  });
}

// INIT
initSdk();