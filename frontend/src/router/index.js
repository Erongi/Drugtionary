import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue") // set home as path '/'
  },
  {
    path: "/patients",
    name: "Patients",
    meta: { login: true },
    component: () => import("../views/Patients.vue") // set patients as path '/'
  },
  {
    path: "/patient/:id",
    name: "Patient",
    meta: { login: true },
    component: () => import("../views/Patient.vue") // set patients as path '/'
  },
  {
    path: "/drugs",
    name: "Drugs",
    component: () => import("../views/Drugs.vue") // set drugs as path '/'
  },
  {
    path: "/addDrug",
    name: "Add Drug",
    meta: { login: true },
    component: () => import("../views/AddDrug.vue") // set drugs as path '/'
  },
  {
    path: "/drug/:id",
    name: "Drug",
    component: () => import("../views/Drug.vue") // set drugs as path '/'
  },
  {
    path: "/note/:id",
    name: "Note",
    meta: { login: true },
    component: () => import("../views/Note.vue") // set note as path '/'
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { login: true },
    component: () => import("../views/Profile.vue") // set profile as path '/'
  },
  {
    path: "/login",
    name: "Login",
    meta: { guess: true },
    component: () => import("../views/Login.vue") // set login as path '/'
  },
  {
    path: "/signup",
    name: "Signup",
    meta: { guess: true },
    component: () => import("../views/Signup.vue") // set Signup as path '/'
  },
  {
    path: "/editProfile",
    name: "EditProfile",
    meta: { login: true },
    component: () => import("../views/EditProfile.vue") // set Signup as path '/'
  },
  {
    path: "/editPassword",
    name: "EditPassword",
    meta: { login: true },
    component: () => import("../views/EditPassword.vue") // set Signup as path '/'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.meta.login && !isLoggedIn) {
    alert("Please login first!");
    next({ path: "/login" });
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in");
    next({ path: "/" });
  }

  next();
});

export default router;
