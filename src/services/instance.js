import Vue from "vue";
import axios from "axios";
import { APP_URL } from "@/configs/app";
import store from "@/store";

const api = axios.create({
  baseURL: APP_URL,
  responseType: "json",
});

const isGetRequest = (method) => {
  return method === "GET" || method === "get";
};

api.interceptors.request.use((config) => {
  config.headers["Accept"] = "application/json";
  if (!isGetRequest(config.method)) {
    // store.commit("app/setLoading", true);
  }
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    const message = response.data.message;
    if (message) notifySuccess(message);
    return response;
  },
  (error) => {
    const message = error.response.data.message;
   
    if (error.response.data.status_code === 401) {
      store.commit("auth/logout");
    }
    if (message) notifyError(message);
    return Promise.reject(error);
  }
);

const notifySuccess = (message) => {
  Vue.notify({
    title: "Success",
    text: message,
    type: "success",
  });
};
const notifyError = (message) => {
  Vue.notify({
    title: "Error",
    text: message,
    type: "error",
  });
};
Vue.prototype.$api = api;

export { api };
export default api;
