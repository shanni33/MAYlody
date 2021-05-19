import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Map from "../views/Map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    },
  {
    path: "/concerts",
    name: "concerts",
    component: () =>
      import(/* webpackChunkName: "Result" */ "../views/Concerts.vue"),
    redirect: "/concerts/all",
    children: [
      {
        path: "all",
        name: "all",
        component: () =>
          import(/* webpackChunkName: "Result" */ "../views/All.vue"),
      },
      {
        path: "selected",
        name: "selected",
        component: () =>
          import(/* webpackChunkName: "Result" */ "../views/Selected.vue"),
      },
      {
        path: "result",
        name: "result",
        component: () =>
          import(/* webpackChunkName: "Result" */ "../views/Results.vue"),
      },
    ],
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "Result" */ "../views/Dashboard.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
