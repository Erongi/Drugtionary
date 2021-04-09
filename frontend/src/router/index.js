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
    path: "/medicines",
    name: "Medicines",
    component: () => import("../views/Medicines.vue") // set drugs as path '/'
  },
  {
    path: "/note",
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
