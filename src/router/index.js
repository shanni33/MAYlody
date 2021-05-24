import Vue from "vue";
import VueRouter from "vue-router";
// import Main from "@/App.vue";
import Home from "@/views/Home.vue";
import Map from "@/views/Map.vue";

Vue.use(VueRouter);

  const routes = [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/concerts",
      name: "Concerts",
      component: () => import("@/views/Concerts.vue"),
      redirect: "/concerts/all",
      children: [
        {
          path: "all",
          name: "All",
          component: () => import("@/views/All.vue"),
        },
        {
          path: "selected",
          name: "Selected",
          component: () => import("@/views/Selected.vue"),
        },
        {
          path: "result",
          name: "Result",
          component: () => import("@/views/Results.vue"),
        },
      ],
    },
    {
      path: "/map",
      name: "Map",
      component: Map,
    },
    {
      path: "/login",
      name: "Login",
      component: () =>
        import("@/views/Login.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "*",
      redirect: "/home",
    },
  ];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
