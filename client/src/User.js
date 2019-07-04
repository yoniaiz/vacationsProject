export class User {
  constructor(first_name, last_name, password, mail, role) {
    this.firstName = first_name;
    this.last_name = last_name;
    this.password = password;
    this.mail = mail;
    this.role = role ? role : 0;
  }
}
export const host = "http://localhost:8080";
