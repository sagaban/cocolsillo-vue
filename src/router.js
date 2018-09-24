import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import DefaultLayout from "./layouts/Default.vue";
import CleanLayout from "./layouts/Clean.vue";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      meta: {
        requiresAuth: true
      },
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
  ],
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  console.log(`requiresAuth: ${requiresAuth}`);
  console.log(`currentUser: ${currentUser}`);
  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (!requiresAuth && currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
