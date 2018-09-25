import fb from "@/firebase-manager";
import {
  SET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  ADD_TRANSACTIONS
} from "@/store/mutation-types";
import startOfMonthFrom from "date-fns/start_of_month";

export default {
  createOrFetchUserProfile({ dispatch, commit, state }) {
    dispatch("fetchUserProfile").then(res => {
      if (!res || !res.exists) {
        const userData = {
          fullName: state.currentUser.displayName,
          email: state.currentUser.email,
          photoURL: state.currentUser.photoURL
        };
        fb.usersCollection
          .doc(state.currentUser.uid)
          .set(userData)
          .then(() => {
            commit(SET_USER_PROFILE, userData);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  },
  fetchUserProfile({ commit, state }) {
    return fb.usersCollection
      .doc(state.currentUser.uid)
      .get()
      .then(res => {
        commit(SET_USER_PROFILE, res.data());
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateUserProfile({ commit, state }, user) {
    return fb.usersCollection
      .doc(state.currentUser.uid)
      .set(user, { merge: true })
      .then(() => {
        commit(UPDATE_USER_PROFILE, user);
      })
      .catch(err => {
        console.log(err);
      });
  },
  createNewInstance({ dispatch, state }) {
    const instance = fb.instancesCollection.doc();
    instance
      .set({
        users: [fb.db.doc(`users/${state.currentUser.uid}`)],
        accounts: [],
        transactions: []
      })
      .then(() => {
        dispatch("updateUserProfile", { associatedInstance: instance.id });
      });
  },
  fetchMonthTransactions({ commit, state }, date) {
    fb.transactionsCollection(state.userProfile.associatedInstance)
      .where("date", ">=", startOfMonthFrom(date))
      .orderBy("date")
      .get()
      .then(res => {
        const transactions = res.docs.map((c, i, a) => ({
          ...c.data(),
          id: a[i].id
        }));
        commit(ADD_TRANSACTIONS, transactions);
      });
  }
};
