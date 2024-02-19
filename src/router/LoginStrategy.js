import { Cookies } from "quasar";
const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

export class login {
  constructor(at, rt) {
    this.at = at;
    this.rt = rt;
  }

  strategy(route, paramId) {
    if (route == "login") {
      return this.toLogin(route, paramId);
    } else {
      if (this.at != null) {
        return;
      } else {
        return { path: "/login", replace: true };
      }
    }
  }

  toLogin(route) {
    if (this.at != null) {
      return { path: "/", replace: true };
    } else {
      return;
    }
  }
}
