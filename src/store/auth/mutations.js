import { setUser } from "@/helpers/auth-handler";
import router from "@/router";

export default {
  login: (state, payload) => {
    state.isLoggedIn = true;
    state.user = payload;
    setUser(payload);
  },
  user: (state, payload) => {
    state.user = payload;
    setUser(payload);
  },
  logout: (state) => {
    state.isLoggedIn = false;
    state.user = undefined;
    localStorage.clear();
    router.push("/login");
  },
};
