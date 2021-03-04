import {
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAILURE,
  ACCOUNT_LOGIN_BEGIN,
} from "./Actions";

import { begin } from "./../BaseReducer";
import { getAttributes } from "./../BaseUpdater";
// reducers
const academicLevelsReducer = (
  state = {
    context: {},
  },
  action
) => {
  switch (action.type) {
    case ACCOUNT_LOGIN_BEGIN:
      return begin(state);
    case ACCOUNT_LOGIN_SUCCESS:
      return {
        ...state,
        context: getAttributes(action.data.data),
      };
    case ACCOUNT_LOGIN_FAILURE:
      return { ...state, error: action };

    default:
      return state;
  }
};

export default academicLevelsReducer;
