import get from "lodash/get";

import { CreateModuleActions } from "./BaseActions";
import { countSelectedItem } from "./BaseSelector";
import {
  flatAttributes,
  getAttributes,
  markAllItemsAsSelected,
  removeFromListIfExists,
  replaceIfSameItem,
} from "./BaseUpdater";

export const epicCurrentStatus = (isBegin, isSuccess, isFailure) => ({
  isBegin,
  isSuccess,
  isFailure,
});

export const begin = (state) => ({
  ...state,
  ...epicCurrentStatus(true, false, false),
});

export const success = (state) => ({
  ...state,
  ...epicCurrentStatus(false, true, false),
});

export const failure = (state) => ({
  ...state,
  ...epicCurrentStatus(false, false, true),
});

export const CreateModuleReducers = (BASE, callBackReducers = null) => {
  const {
    SUCCESS,
    FAILURE,
    LIST_BEGIN,
    LIST_SUCCESS,
    LIST_FAILURE,
    SEARCH_BEGIN,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    CREATE_SUCCESS,
    UPDATE_SUCCESS,
    DELETE_SELECTED_BEGIN,
    DELETE_SELECTED_SUCCESS,
    DELETE_SELECTED_FAILURE,
    MARK_ALL_SELECTED,
    MARK_SELECTED,
    HANDLE_META,
  } = CreateModuleActions(BASE);

  // reducers
  const reducer = (
    state = {
      list: [],
      item: [],
      selectedTotal: undefined,
    },
    action
  ) => {
    switch (action.type) {
      case LIST_BEGIN || SEARCH_BEGIN || DELETE_SELECTED_BEGIN:
        return begin(state);

      case LIST_SUCCESS:
        return success({ ...state, list: flatAttributes(action.data) });

      case LIST_FAILURE:
        return failure({ ...state, error: action });

      case SEARCH_SUCCESS:
        return success({ ...state, list: flatAttributes(action.data) });

      case SEARCH_FAILURE:
        return failure({ ...state, error: action });

      case MARK_SELECTED:
        const listMarkSelected = replaceIfSameItem(state.list, action.data);
        return {
          ...state,
          list: listMarkSelected,
          selectedTotal: countSelectedItem(listMarkSelected),
        };

      case MARK_ALL_SELECTED:
        const listAllSelected = markAllItemsAsSelected(state.list, action);
        return {
          ...state,
          list: listAllSelected,
          selectedTotal: countSelectedItem(listAllSelected),
        };

      case DELETE_SELECTED_SUCCESS:
        return {
          ...state,
          list: removeFromListIfExists(state.list, action.selected_ids),
        };

      case DELETE_SELECTED_FAILURE:
        return { ...state, error: action };

      case CREATE_SUCCESS:
        const CreateSuccessCall = get(
          callBackReducers,
          `[0].${CREATE_SUCCESS}`
        );
        if (CreateSuccessCall) {
          return CreateSuccessCall({ state, action });
        } else {
          return { ...state, item: getAttributes(action.data) };
        }

      case UPDATE_SUCCESS:
        return { ...state, item: getAttributes(action.data) };

      case SUCCESS:
        return { ...state, item: getAttributes(action.data) };

      case FAILURE:
        return { ...state, error: action };

      case HANDLE_META:
        return { ...state, meta: action.data };

      default:
        return state;
    }
  };
  return reducer;
};
