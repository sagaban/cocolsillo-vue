import _ from "lodash";
import {
  SET_CURRENT_USER,
  SET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  ADD_TRANSACTIONS
} from "@/store/mutation-types";

export default {
  [SET_CURRENT_USER](state, val) {
    state.currentUser = val;
  },
  [SET_USER_PROFILE](state, val) {
    state.userProfile = val;
  },
  [UPDATE_USER_PROFILE](state, val) {
    state.userProfile = { ...state.userProfile, ...val };
  },
  [ADD_TRANSACTIONS](state, transactions) {
    state.transactions = _.unionBy(transactions, state.transactions, "id");
  }
};
