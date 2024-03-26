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

import { GetUsers, UserType, GetConfigurationIdentifiers } from "../global";
import { CreateNewTeamDto } from "./dtos/createNewTeamDto";
import { AddOrRemoveTeamAdminDto } from "./dtos/addOrRemoveTeamAdminDto";
import { AddOrRemoveReleaseManagerDto } from "./dtos/addOrRemoveReleaseManagerDto";
import { AddOrRemoveSonarCloudUserDto } from "./dtos/addOrRemoveSonarCloudUserDto";
import { AddOrRemove } from "./dtos/common/AddOrRemoveEnum";

var currentProject: IProjectInfo | undefined;

function initSdk(): void {
  console.log("Initializing SDK");

  SDK.init();

  SDK.ready().then(async function () {
    console.log("SDK is ready");

    let projectService = await SDK.getService<IProjectPageService>(
      CommonServiceIds.ProjectPageService
    );
    currentProject = await projectService.getProject();

    document.body.querySelector("#project-name")!.innerHTML = currentProject!.name;
  });
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

InitDocumentData();

RegisterEventListeners();


function RegisterEventListeners() {
  let showMessageBannerWithButtonsButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#show-banner-with-buttons");
  showMessageBannerWithButtonsButton.addEventListener("click", showMessageBannerWithButtons);

  let createTeamButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#create-new-team");
  createTeamButton.addEventListener("click", (clickEvent) => {
    if (clickEvent.target instanceof Element) {
      let targetElement: Element = clickEvent.target!;

      let form: HTMLFormElement = <HTMLFormElement>targetElement.closest("form");

      let inputs: HTMLFormControlsCollection = form.elements;

      let dto: CreateNewTeamDto = new CreateNewTeamDto((<HTMLInputElement>inputs.namedItem("product-owner")).value,
        (<HTMLInputElement>inputs.namedItem("team-name")).value,
        (<HTMLInputElement>inputs.namedItem("initial-admin")).value,
        (<HTMLInputElement>inputs.namedItem("base-path")).value,
        (<HTMLInputElement>inputs.namedItem("base-name")).value,
        (<HTMLInputElement>inputs.namedItem("is-area-path-private")).checked);

      console.log(dto);

      if (dto.IsValid()) {
        console.log(`${form.id} is valid`);
        //TODO SEND TO BACKEND
      }
      else {
        console.log(`${form.id} invalid`);
      }
    }
  });

  let addOrRemoveTeamAdminButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#submit-team-admin");
  addOrRemoveTeamAdminButton.addEventListener("click", (clickEvent) => {
    if (clickEvent.target instanceof Element) {
      let targetElement: Element = clickEvent.target!;

      let form: HTMLFormElement = <HTMLFormElement>targetElement.closest("form");

      let inputs: HTMLFormControlsCollection = form.elements;

      let dto = new AddOrRemoveTeamAdminDto(
        (<HTMLInputElement>inputs.namedItem("team-name")).value,
        (<HTMLInputElement>inputs.namedItem("admin-name")).value,
        (<HTMLInputElement>inputs.namedItem("add-or-remove-action")).value === "add" ? AddOrRemove.Add : AddOrRemove.Remove);

      console.log(dto);

      if (dto.IsValid()) {
        console.log(`${form.id} is valid`);
        //TODO SEND TO BACKEND
      }
      else {
        console.log(`${form.id} invalid`);
      }
    }
  });

  let addOrRemoveReleaseManagerButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#submit-release-management-changes");
  addOrRemoveReleaseManagerButton.addEventListener("click", (clickEvent) => {
    if (clickEvent.target instanceof Element) {
      let targetElement: Element = clickEvent.target!;

      let form: HTMLFormElement = <HTMLFormElement>targetElement.closest("form");

      let inputs: HTMLFormControlsCollection = form.elements;

      let checkedEnvironments: string[] = [];
      console.log((<RadioNodeList>inputs.namedItem("can-release-to-environment")).forEach((checkbox) => {
        let inputElement = <HTMLInputElement>checkbox;
        if (inputElement.checked) {
          checkedEnvironments.push(inputElement.value)
        }
      }));

      let dto = new AddOrRemoveReleaseManagerDto(
        (<HTMLInputElement>inputs.namedItem("configuration-item-id")).value,
        (<HTMLInputElement>inputs.namedItem("new-user")).value,
        checkedEnvironments,
        (<HTMLInputElement>inputs.namedItem("add-or-remove-action")).value === "add" ? AddOrRemove.Add : AddOrRemove.Remove);

      console.log(dto);

      if (dto.IsValid()) {
        console.log(`${form.id} is valid`);
        //TODO SEND TO BACKEND
      }
      else {
        console.log(`${form.id} invalid`);
      }
    }
  });

  let addOrRemoveSonarCloudUserButton: HTMLButtonElement = <HTMLButtonElement>document.body.querySelector("button#submit-sonarcloud-team-access");
  addOrRemoveSonarCloudUserButton.addEventListener("click", (clickEvent) => {
    if (clickEvent.target instanceof Element) {
      let targetElement: Element = clickEvent.target!;

      let form: HTMLFormElement = <HTMLFormElement>targetElement.closest("form");

      let inputs: HTMLFormControlsCollection = form.elements;

      let dto = new AddOrRemoveSonarCloudUserDto(
        (<HTMLInputElement>inputs.namedItem("configuration-item-id")).value,
        (<HTMLInputElement>inputs.namedItem("sonar-user-id")).value,
        (<HTMLInputElement>inputs.namedItem("sonar-team-name")).value,
        (<HTMLInputElement>inputs.namedItem("add-or-remove-action")).value === "add" ? AddOrRemove.Add : AddOrRemove.Remove
      );

      console.log(dto);

      if (dto.IsValid()) {
        console.log(`${form.id} is valid`);
        //TODO SEND TO BACKEND
      }
      else {
        console.log(`${form.id} invalid`);
      }
    }
  });
}

function InitDocumentData() {
  let allUsers = GetUsers();

  let adminUsers = allUsers.filter(ui => ui.Role == UserType.Admin);
  let productOwners = allUsers.filter(ui => ui.Role == UserType.ProductOwner);
  let basicUsers = allUsers.filter(ui => ui.Role == UserType.Basic);

  let ciSelectElements = document.body.querySelectorAll('select.configurationIdentifiers') as NodeListOf<HTMLSelectElement>;
  ciSelectElements.forEach(ciSelectors => {
    GetConfigurationIdentifiers().forEach(ci => {
      ciSelectors.add(new Option(ci, ci, false, false));
    });
  });

  let allUsersSelectElements = document.body.querySelectorAll('select.users') as NodeListOf<HTMLSelectElement>;
  allUsersSelectElements.forEach(allUsersSelect => {
    allUsers.forEach(user => {
      allUsersSelect.add(new Option(user.Name, user.Upn, false, false));
    });
  });

  let adminSelectElements = document.body.querySelectorAll('select.admin-users') as NodeListOf<HTMLSelectElement>;
  adminUsers.forEach(user => {
    adminSelectElements.forEach(adminSelect => {
      adminSelect.add(new Option(user.Name, user.Upn, false, false));
    });
  });

  let productOwnerSelectElements = document.body.querySelectorAll('select.product-owner-users') as NodeListOf<HTMLSelectElement>;
  productOwners.forEach(user => {
    productOwnerSelectElements.forEach(poSelect => {
      poSelect.add(new Option(user.Name, user.Upn, false, false));
    });
  });

  let basicUserSelectElements = document.body.querySelectorAll('select.basic-users') as NodeListOf<HTMLSelectElement>;
  basicUsers.forEach(user => {
    basicUserSelectElements.forEach(basicUserSelect => {
      basicUserSelect.add(new Option(user.Name, user.Upn, false, false));
    });
  });
}

