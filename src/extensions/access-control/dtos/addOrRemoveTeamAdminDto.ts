import { AddOrRemove } from "./common/AddOrRemoveEnum";

export class AddOrRemoveTeamAdminDto {
  public TeamName: string;
  public AdminUpn: string;
  public Action: AddOrRemove;

  constructor(
    teamName: string,
    adminUpn: string,
    action: AddOrRemove
  ) {
    this.TeamName = teamName;
    this.AdminUpn = adminUpn;
    this.Action = action;
  }

  IsValid(): boolean {
    if (!this.TeamName.IsNullEmptyOrWhiteSpace()
      && !this.AdminUpn.IsNullEmptyOrWhiteSpace()
      && this.AdminUpn.IsEmailAddress()) {
      return true;
    }
    return false;
  }
}