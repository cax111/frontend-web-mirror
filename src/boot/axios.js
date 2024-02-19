import Vue from "vue";
import axios from "axios";
import { Cookies, Loading } from "quasar";

Vue.prototype.$axios = axios;

export default ({ app, route, router, store, Vue, ssrContext }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.data.message == "User tidak dapat ditemukan") {
        let hostname;
        if (window.location.hostname == "localhost") {
          hostname = window.location.hostname;
        } else {
          let host = window.location.hostname.split(".");
          hostname = host[1] + "." + host[2];
        }

        cookies.remove("at", { domain: hostname, path: "/" });
        cookies.remove("rt", { domain: hostname, path: "/" });
        cookies.remove("is_register", { domain: hostname, path: "/" });

        Loading.hide();
        setTimeout(() => {
          window.location.href = "/login";
        }, 200);
      } else if (
        error.response.status == 401 &&
        error.response.data.message.toLowerCase() != "expired token"
      ) {
        let hostname;
        if (window.location.hostname == "localhost") {
          hostname = window.location.hostname;
        } else {
          let host = window.location.host.split(".");
          hostname = host[1] + "." + host[2];
        }

        cookies.remove("at", { path: "/", domain: hostname });
        cookies.remove("rt", { path: "/", domain: hostname });
        cookies.remove("is_register", { path: "/", domain: hostname });
        if (router.currentRoute.name != 'paket' && router.currentRoute.name != 'help' && router.currentRoute.name != 'formasi' && router.currentRoute.name != 'payment' && router.currentRoute.name != 'migrasi') {
          setTimeout(() => {
            window.location.href = "/login";
          }, 200);
        }
      } else if (
        error.response.status == 401 &&
        error.response.data.message.toLowerCase() == "expired token"
      ) {
        Loading.show();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + cookies.get("rt");
      }
      return Promise.reject(error);
    }
  );

  axios.interceptors.request.use(function (config) {
    return config;
  });

  let at = cookies.get("at");
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = "Bearer " + at;

  Vue.prototype.$axios = axios;
};
