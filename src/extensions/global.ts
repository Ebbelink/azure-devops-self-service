var users: UserInfo[];

export class UserInfo {
  constructor(name: string, upn: string, role: UserType) {
    this.Name = name;
    this.Upn = upn;
    this.Role = role;
  }

  public readonly Name: string;
  public readonly Upn: string;
  public readonly Role: UserType;
}

export enum UserType {
  Basic = "BASIC",
  Admin = "ADMIN",
  ProductOwner = "PRODUCT OWNER"
}

export function GetUsers(): UserInfo[] {
  let allUsers = new Array<UserInfo>(
    new UserInfo("Mr. Ebbelink", "mr@ebbelink.nl", UserType.Admin),

    new UserInfo("Armadillo Axolotl", "armadillo.axolotl@starttoscaleit.com", UserType.Basic),
    new UserInfo("Beaver Bear", "beaver.bear@starttoscaleit.com", UserType.Basic),
    new UserInfo("Cat Caraccal", "cat.caraccal@starttoscaleit.com", UserType.Basic),
    new UserInfo("Dromadary Dik Dik", "dromadary.dik.dik@starttoscaleit.com", UserType.Basic),

    new UserInfo("Pinguin Panda", "pinguin.panda@starttoscaleit.com", UserType.ProductOwner),
    new UserInfo("Giraffe Gazelle", "giraffe.gazelle@starttoscaleit.com", UserType.ProductOwner),
    new UserInfo("Cat Caraccal", "cat.caraccal@starttoscaleit.com", UserType.ProductOwner),
    new UserInfo("Woodpecker Wooly Mammoth", "woodpecker.wooly.mammoth@starttoscaleit.com", UserType.ProductOwner));

  return allUsers;
}

export function GetConfigurationIdentifiers(): string[] {
  let cis = new Array<string>("ABCD","EFGH","IJKL","MNOP","QRST", "UVW", "XYZ");

  return cis;
}