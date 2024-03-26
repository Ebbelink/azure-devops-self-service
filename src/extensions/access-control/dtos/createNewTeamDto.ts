import "../../stringExtensions"

export class CreateNewTeamDto {
  public ProductOwner: string;
  public TeamName: string;
  public Admin: string;
  public BasePath: string;
  public BaseName: string;
  public IsAreaPathPrivate: boolean;

  constructor(productOwner: string,
    teamName: string,
    admin: string,
    basePath: string,
    baseName: string,
    isAreaPathPrivate: boolean) {
    this.ProductOwner = productOwner;
    this.TeamName = teamName;
    this.Admin = admin;
    this.BasePath = basePath;
    this.BaseName = baseName;
    this.IsAreaPathPrivate = isAreaPathPrivate;
  }

  IsValid(): boolean {
    if (!this.ProductOwner.IsNullEmptyOrWhiteSpace()
      && !this.TeamName.IsNullEmptyOrWhiteSpace()
      && !this.Admin.IsNullEmptyOrWhiteSpace()
      && !this.BasePath.IsNullEmptyOrWhiteSpace()
      && !this.BaseName.IsNullEmptyOrWhiteSpace()
      && this.ProductOwner.IsEmailAddress()
      && this.Admin.IsEmailAddress()) {
      return true;
    }
    return false;
  }
}