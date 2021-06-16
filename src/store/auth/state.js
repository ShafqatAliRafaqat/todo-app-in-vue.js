import { getUser } from "@/helpers/auth-handler";
const states = {
  isLoggedIn: localStorage.getItem("access_token") ? true : false,
  user: getUser(),
};

export default states;
