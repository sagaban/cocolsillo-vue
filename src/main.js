import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import VueFire from "vuefire";
import firebase from "firebase";
import firebaseConfig from "../firebase.config";

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

Vue.use(VueFire);
firebase.initializeApp(firebaseConfig);
/*
// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
*/
Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(`user.displayName: ${user.displayName}`);
  console.log(`user.email: ${user.email}`);
  console.log(`user.photoURL: ${user.photoURL}`);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
