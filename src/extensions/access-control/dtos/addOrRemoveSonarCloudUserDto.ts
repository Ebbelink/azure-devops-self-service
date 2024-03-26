import { AddOrRemove } from "./common/AddOrRemoveEnum";

export class AddOrRemoveSonarCloudUserDto {
  public ConfigurationId: string;
  public SonarCloudUserId: string;
  public SonarCloudTeamName: string;
  public Action: AddOrRemove;

  constructor(
    configurationId: string,
    sonarCloudUserId: string,
    sonarCloudTeamName: string,
    action: AddOrRemove
  ) {
    this.ConfigurationId = configurationId;
    this.SonarCloudUserId = sonarCloudUserId;
    this.SonarCloudTeamName = sonarCloudTeamName;
    this.Action = action;
  }

  IsValid(): boolean {
    if (!this.ConfigurationId.IsNullEmptyOrWhiteSpace()
      && !this.SonarCloudUserId.IsNullEmptyOrWhiteSpace()
      && !this.SonarCloudTeamName.IsNullEmptyOrWhiteSpace()) {
      return true;
    }
    return false;
  }
}