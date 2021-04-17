import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/concerts",
  //   name: "concerts",
  //   component: () =>
  //     import(/* webpackChunkName: "ConcertCard" */ "../views/ConcertCard.vue"),
  // },
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
