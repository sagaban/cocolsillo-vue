import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import fb from "@/firebase-manager";

import "./styles/quasar.styl";
import lang from "quasar-framework/i18n/es";
import iconSet from "quasar-framework/icons/fontawesome";
import "quasar-extras/animate";
import "quasar-extras/roboto-font";
import "quasar-extras/fontawesome";
import {
  Quasar,
  QBtn,
  QLayout,
  QLayoutHeader,
  QLayoutDrawer,
  QPage,
  QPageContainer,
  QToolbar,
  QToolbarTitle,
  QList,
  QListHeader,
  QItemSeparator,
  QItem,
  QItemSide,
  QItemMain
} from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QLayout,
    QLayoutHeader,
    QLayoutDrawer,
    QPage,
    QPageContainer,
    QToolbar,
    QToolbarTitle,
    QList,
    QListHeader,
    QItemSeparator,
    QItem,
    QItemSide,
    QItemMain
  },
  directives: {},
  plugins: {},
  i18n: lang,
  iconSet: iconSet
});

Vue.config.productionTip = false;

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
      computed: {
        userProfile() {
          return this.$store.getters.userProfile;
        }
      },
      watch: {
        userProfile() {
          if (
            this.$store.getters.userProfile &&
            !this.$store.getters.userProfile.associatedInstance
          ) {
            this.$store.dispatch("createNewInstance");
          }
        }
      }
    }).$mount("#app");
  }
});
