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
    component: () => import("../views/Patients.vue") // set patients as path '/'
  },
  {
    path: "/patient/:id",
    name: "Patient",
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
    component: () => import("../views/Note.vue") // set note as path '/'
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue") // set profile as path '/'
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue") // set login as path '/'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
