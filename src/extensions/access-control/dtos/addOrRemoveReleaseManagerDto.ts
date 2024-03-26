import { AddOrRemove } from "./common/AddOrRemoveEnum";

export class AddOrRemoveReleaseManagerDto {
  public ConfigurationId: string;
  public UserUpn: string;
  public TargetEnvironments: string[];
  public Action: AddOrRemove;

  constructor(
    configurationId: string,
    userUpn: string,
    targetEnvironments: string[],
    action: AddOrRemove
  ) {
    this.ConfigurationId = configurationId;
    this.UserUpn = userUpn;
    this.TargetEnvironments = targetEnvironments;
    this.Action = action;
  }

  IsValid(): boolean {
    if (!this.ConfigurationId.IsNullEmptyOrWhiteSpace()
      && !this.UserUpn.IsNullEmptyOrWhiteSpace()
      && this.UserUpn.IsEmailAddress()
      && this.TargetEnvironments.length > 0) {
      return true;
    }
    return false;
  }
}