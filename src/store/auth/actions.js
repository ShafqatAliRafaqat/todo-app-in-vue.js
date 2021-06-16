import { api } from "@/services/instance";
export default {
  logout: ({ commit }) => {
    api.post("/logout").then(() => {
      commit("logout");
    });
  },
};
