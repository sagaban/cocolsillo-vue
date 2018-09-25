import Vue from "vue";
import Vuex from "vuex";
// import createLogger from "vuex/dist/logger";
import fb from "@/firebase-manager";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { SET_CURRENT_USER } from "@/store/mutation-types";

Vue.use(Vuex);

const plugins = [];

// if (process.env.NODE_ENV === "development") {
//   plugins.push(createLogger());
// }

const baseState = {
  currentUser: null,
  userProfile: null,
  transactions: []
};

const store = new Vuex.Store({
  state: baseState,
  getters,
  mutations,
  actions,
  plugins
});

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit(SET_CURRENT_USER, user);
    store.dispatch("createOrFetchUserProfile");

    // fb.usersCollection.doc(user.uid).onSnapshot(doc => {
    //   store.commit(SET_USER_PROFILE, doc.data());
    // });
  }
});

export default store;
