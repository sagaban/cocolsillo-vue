import fb from "@/firebase-manager";
import { SET_USER_PROFILE } from "@/store/mutation-types";

export default {
  createOrFetchUserProfile({ dispatch, state }) {
    dispatch("fetchUserProfile").then(res => {
      if (!res || !res.exists) {
        fb.usersCollection.doc(state.currentUser.uid).set({
          fullName: state.currentUser.displayName,
          email: state.currentUser.email,
          photoURL: state.currentUser.photoURL
        });
        // .then(() => {
        //   console.log("createOrFetchUserProfile");
        //   this.$store.dispatch("fetchUserProfile");
        // });
      }
    });
  },
  fetchUserProfile({ commit, state }) {
    fb.usersCollection
      .doc(state.currentUser.uid)
      .get()
      .then(res => {
        commit(SET_USER_PROFILE, res.data());
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
