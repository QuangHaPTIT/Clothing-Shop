export class UpdateUserDTO {
  fullname: string;
  password: string;
  date_of_birth: Date;
  address: string;
  retype_password: string;
  constructor(data: any) {
    this.fullname = data.fullname;
    this.password = data.password;
    this.date_of_birth = data.date_of_birth;
    this.address = data.address;
    this.retype_password = data.retype_password
  }
}
