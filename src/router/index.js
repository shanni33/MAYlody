import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/concerts",
    component: () =>
      import(/* webpackChunkName: "ConcertCard" */ "../views/ConcertCard.vue"),
  },
  {
    path: "/result",
    component: () =>
      import(/* webpackChunkName: "Result" */ "../views/Result.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
