import "./repositories.scss";
import { GetUsers, UserInfo, UserType } from "../global"

import * as SDK from "azure-devops-extension-sdk";
import {
  getClient,
  CommonServiceIds,
  IProjectInfo,
} from "azure-devops-extension-api";
import {
  GitRestClient,
  GitRepositoryCreateOptions,
  GitRepository
} from "azure-devops-extension-api/Git";

var currentProject: IProjectInfo | undefined;
var gitClient: GitRestClient;


function initSdk(): void {
  console.log("Initializing SDK");

  SDK.init();

  SDK.ready().then(async function () {
    console.log("SDK is ready");

    gitClient = getClient(GitRestClient);
    let repos: GitRepository[] = await gitClient.getRepositories();

    let repoOverView = <HTMLElement>document.body.querySelector("#repo-overview");
    repoOverView.innerText = JSON.stringify(repos.map(repo => {
      return {
        "name": repo.name,
        "link": repo.webUrl,
        "project-name": repo.project.name
      };
    }), undefined, 2);
  });
}

let createRepoButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#create-repo");
createRepoButton.addEventListener("click", () => {
  let repoNameInput = <HTMLInputElement>document.body.querySelector("#repo-name");
  let ciInput = <HTMLInputElement>document.body.querySelector("#ci");
  createRepo(`${ciInput.value}.${repoNameInput.value}`);
});

async function createRepo(name: string): Promise<void> {
  const accessToken = await SDK.getAccessToken();

  console.log(gitClient.getRepositories("madailei"));

  const options = {} as GitRepositoryCreateOptions;
  options.name = name;

  if (!currentProject || !name) {
    console.error("Missing either project or repo name");
  }

  var repository = await gitClient.createRepository(options, currentProject!.name);
}

// INIT
initSdk();
