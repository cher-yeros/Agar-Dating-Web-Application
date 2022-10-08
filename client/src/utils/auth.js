const auth = {
  checkAuth() {
    const user = this.getUser();
    if (user?.token) {
      return true;
    } else {
      return false;
    }
  },
  checkAdmin() {
    this.checkAuth();
    if (this.checkAuth()) {
      const isAdmin = localStorage.getItem("isAdmin");
      console.log(isAdmin);
      return isAdmin == "true";
    } else {
      return false;
    }
  },
  login() {},
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
  },
  getUser() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  },
};

export default auth;
