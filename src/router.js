import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import CleanLayout from "./layouts/Clean.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: Home
        },
        {
          path: "/about",
          name: "about",
          component: About
        }
      ]
    },
    {
      path: "/login",
      component: CleanLayout,
      children: [
        {
          path: "",
          name: "login",
          component: Login
        }
      ]
    }
  ]
});
