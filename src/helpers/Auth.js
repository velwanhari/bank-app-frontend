class Authenticator {
  saveAuth(userType, token) {
    localStorage.setItem("userType", userType);
    localStorage.setItem("token", token);
  }

  checkIsLogin() {
    const token = localStorage.getItem("token");
    if (token == null) {
      return false;
    }
    if (token.length === 0) {
      return false;
    }
    return token;
  }

  getLogedInUsertype() {
    const isLogedIn = this.checkIsLogin();
    if (false === isLogedIn) {
      return false;
    }
    const userType = localStorage.getItem("userType");
    return userType;
  }

  logout() {
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
  }
}

const Auth = new Authenticator();

export default Auth;
