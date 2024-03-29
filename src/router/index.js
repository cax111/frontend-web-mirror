import Vue from "vue";
import VueRouter from "vue-router";
import { Cookies } from "quasar";
import routes from "./routes/routes";
import VueMathjax from "vue-mathjax";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
import VueYoutube from 'vue-youtube';
import { login } from "./LoginStrategy.js";

Vue.use(VueRouter);
Vue.use(VueMathjax);
Vue.use(LottieAnimation);
Vue.use(VueYoutube);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store, ssrContext }) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const is_register = cookies.get("is_register");
  const at = cookies.get("at");
  const rt = cookies.get("rt");
  const Login = new login(at, rt, is_register);
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeResolve((to, from, next) => {
    if (to.path == "/login") {
      next(Login.strategy("login"));
    } else {
      next(Login.strategy("else"));
    }
  });

  return Router;
}
