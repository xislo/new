import get from "lodash/get";

const baseKey = "Account";
export const selectUserContext = (state) => {
  return get(state, `${baseKey}.context`, []);
};
