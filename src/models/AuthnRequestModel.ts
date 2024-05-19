class AuthnRequestModel {
  fullName?: string | undefined;
  userEmail: string;
  password: string;

  constructor(userEmail: string, password: string, fullName?: string) {
    this.fullName = fullName;
    this.userEmail = userEmail;
    this.password = password;
  }
}

export default AuthnRequestModel;
