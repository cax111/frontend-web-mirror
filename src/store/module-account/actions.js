import { Cookies } from "quasar";
import axios from "axios";

// GET ACTION API
export function getHome({ getters, commit }) {
  return new Promise((resolve, reject) => {
    commit("mutateUserLoad", true);
    axios
      .get(getters.getRootUrl + "/api/mirror")
      .then((response) => {
        commit("mutateHome", response.data.data);
        commit("mutateUserLoad", false);
        resolve(response);
      })
      .catch((error) => {
        commit("mutateUserLoad", false);
        reject(error);
      });
  });
}

export function getUserProfile({ getters, commit }) {
  return new Promise((resolve, reject) => {
    commit("mutateUserLoad", true);
    axios
      .get(getters.getRootUrl + "/api/me")
      .then((response) => {
        commit("mutateUserProfile", response.data.data);
        commit("mutateUserLoad", false);
        resolve(response);
      })
      .catch((error) => {
        commit("mutateUserLoad", false);
        reject(error);
      });
  });
}

export function getLessons({ getters, commit }) {
  return new Promise((resolve, reject) => {
    axios
      .get(getters.getRootUrl + `/api/mirror/lesson`)
      .then((response) => {
        commit("mutateLessons", response.data.data);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getRequest({ getters, commit }) {
  return new Promise((resolve, reject) => {
    axios
      .get(getters.getRootUrl + `/api/mirror/request`)
      .then((response) => {
        commit("mutateRequest", response.data.data);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function zoomQuestionExplain({ commit }, data) {
  commit("mutateTryoutExplainZoom", data);
}

// POST ACTION API
export function getQuestion({ getters, state, commit }, body) {
  commit("mutateUserLoad", true);
  commit("mutateQuestionsLoad", true);
  return new Promise((resolve, reject) => {
    axios
      .post(getters.getRootUrl + "/api/mirror/question", body)
      .then((response) => {
        if (body.page > 1) {
          commit("mutateQuestionsMore", response.data.data);
        } else {
          commit("mutateQuestions", response.data.data);
        }
        commit("mutateQuestionsCurrentPage", response.data.meta.current_page);
        commit("mutateQuestionsLastPage", response.data.meta.last_page);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      }).finally(() => {
        commit("mutateUserLoad", false);
        commit("mutateQuestionsLoad", false);
      });
  });
}
export function questionAction({ getters }, body) {
  return new Promise((resolve, reject) => {
    axios
      .post(getters.getRootUrl + "/api/mirror/question/action", body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function login({ getters, state, commit }, credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post(getters.getRootUrl + "/api/login", credentials)
      .then((response) => {
        const access_token = response.data.data.access_token.token;
        const refresh_token = response.data.data.access_token.token;
        commit("setToken", {
          access_token: access_token,
          refresh_token: refresh_token,
        });

        let hostname;
        if (window.location.hostname == "localhost") {
          hostname = window.location.hostname;
        } else {
          let host = window.location.hostname.split(".");
          hostname = host[1] + "." + host[2];
        }
        Cookies.set("at", state.access_token, {
          expires: 14,
          secure: true,
          path: "/",
          domain: hostname,
        });

        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + state.access_token;

        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function logout({ state, rootGetters, commit }) {
  if (state.access_token) {
    commit("clearToken")
    let hostname;
    if (window.location.hostname == "localhost") {
      hostname = window.location.hostname;
    } else {
      let host = window.location.hostname.split(".");
      hostname = host[1] + "." + host[2];
    }

    Cookies.remove("at", { path: "/", domain: hostname });
    Cookies.remove("rt", { path: "/", domain: hostname });
    Cookies.remove("is_register", { path: "/", domain: hostname });

    localStorage.clear();
  }
}