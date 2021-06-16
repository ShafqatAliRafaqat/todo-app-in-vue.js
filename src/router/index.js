import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const authCheck = (to, from, next) => {
  if (store.state.auth.isLoggedIn) {
    if (["/login", "/register", "/forgot-password"].includes(to.path)) {
      next(from.path);
      return;
    }
    next();
    return;
  }
  next("/");
};
const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.isLoggedIn) {
    next(from.path);
    return;
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: ifAuthenticated,
    component: () => import("@/layouts/Auth.vue"),
    children: [{ path: "", component: () => import("@/views/Home.vue") }],
  },
  {
    path: "/dashboard",
    component: () => import("@/layouts/Master.vue"),
    beforeEnter: authCheck,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/todo/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: ifAuthenticated,
    component: () => import("@/layouts/Auth.vue"),
    children: [{ path: "", component: () => import("@/views/auth/Login.vue") }],
  },
  {
    path: "/register",
    name: "register",
    beforeEnter: ifAuthenticated,
    component: () => import("@/layouts/Auth.vue"),
    children: [{ path: "", component: () => import("@/views/auth/Register.vue") }],
  },
  {
    path: "/verification",
    name: "verification",
    beforeEnter: ifAuthenticated,
    component: () => import("@/layouts/Auth.vue"),
    children: [{ path: "", component: () => import("@/views/auth/EmailVerification.vue") }],
  },
  {
    path: "*",
    name: "Error",
    component: () =>
      import("@/views/Error.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
