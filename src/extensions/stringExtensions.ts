interface String {
  IsNullEmptyOrWhiteSpace(): boolean;
  IsEmailAddress(): boolean;
}

String.prototype.IsNullEmptyOrWhiteSpace = function (this: string): boolean {
  if (this === undefined || this === null) {
    return true;
  }
  if (this.length === 0) {
    return true;
  }
  for (let index = 0; index < this.length; index++) {
    if (this[index] !== " ") {
      return false;
    }
  }
  return false;
}

const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
String.prototype.IsEmailAddress = function (this: string): boolean {
  return emailRegexp.test(this);
}
