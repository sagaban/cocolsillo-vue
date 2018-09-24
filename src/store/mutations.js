import { SET_CURRENT_USER, SET_USER_PROFILE } from "@/store/mutation-types";

export default {
  [SET_CURRENT_USER](state, val) {
    state.currentUser = val;
  },
  [SET_USER_PROFILE](state, val) {
    state.userProfile = val;
  }
};
