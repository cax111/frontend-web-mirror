import { Cookies } from "quasar";
export default function () {
  let master_url;
  if (window.location.hostname == "localhost") {
    master_url = process.env.API_DEV_URL;
    // master_url = "https://api.jadibumn.id";
  } else if (window.location.hostname.match("192.168")) {
    master_url = process.env.API_DEV_URL;
  } else {
    let host = window.location.hostname.split(".");
    let hostname = host[0] + "." + host[1] + "." + host[2];
    if (hostname.match("app." + process.env.WEB_URL)) {
      master_url = process.env.API_URL;
    } else {
      master_url = process.env.API_DEV_URL;
    }
  }
  return {
    root_url: `${master_url}`,
    access_token: Cookies.get("at") || null,
    refresh_token: Cookies.get("rt") || null,

    userLoad: false,
    home: {},
    userProfile: {},
    lessons: [],
    request: [],
    questions: [],
    questionsLoad: false,
    questionsCurrentPage: 1,
    questionsLastPage: 1,
    tryout_explain_zoom: 16,
  };
}
