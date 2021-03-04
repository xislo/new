import map from "lodash/map";
import concat from "lodash/concat";
import get from "lodash/get";
import filter from "lodash/filter";
import head from "lodash/head";
import remove from "lodash/remove";
import includes from "lodash/includes";
import { getISOFormattedDate } from "modules/App/Pages/Components/Utilities";

export const getAttributes = (data) => get(data, "attributes");

export const selectFirstFieldValues = (data_array) => {
  return get(head(data_array), "sys_field_values");
};

export const setStatusMeta = (list) => {
  return selectFirstFieldValues(filter(list, ["field_name", "status"]));
};

export const flatAttributes = (data) => {
  return map(data, (node) => ({
    ...node.attributes,
  }));
};

export const selectOne = (list, selectedList, item) => {
  list.data = map(list, (obj) => {
    if (obj.id === item.Info) obj.selected = item.selected;
    return obj;
  });

  if (!item.selected)
    selectedList = selectedList.filter((o) => o !== item.Info);
  else selectedList = [...selectedList, item.Info];

  return {
    list: list,
    selectedList: selectedList,
  };
};

export const selectAll = (list, action) => {
  var selectedList = [];

  if (action.selected) {
    selectedList = [...new Set(list.map((obj) => obj.id))];
  }

  list.data = map(list, (Obj) => {
    Obj.selected = action.selected;
    return Obj;
  });

  return {
    list: list,
    selectedList: selectedList,
  };
};

export const append = (list, payload) => {
  return concat(list, flatAttributes(payload));
};

export const update = (list, payload) => {
  payload = getAttributes(payload);

  return map(list, (item) => {
    if (item.id === payload.id) item = payload;
    return item;
  });
};

export const replaceIfSameItem = (list, payload) => {
  return map(list, (item) => {
    return item.id === payload.id ? { ...payload } : item;
  });
};

// todo: move removeOne and removeMany from BaseSelector here
export const removeFromListIfExists = (list, selected_ids) => {
  return remove(list, (item) => !includes(selected_ids, item.id));
};

export const formatDates = (list, fieldToFormat, fieldToUpdate) => {
  return map(list, (item) => {
    item[fieldToUpdate] = getISOFormattedDate(
      item[fieldToFormat] !== null ? item[fieldToFormat] : new Date()
    );
    return item;
  });
};

export const replaceItemInList = (list, payload) => {
  payload = flatAttributes(payload);
  return map(list, (item) => {
    if (item.id === payload.id) {
      item = payload;
    }
    return item;
  });
};

export const markAllItemsAsSelected = (list, { selected }) =>
  map(list, (item) => ({ ...item, selected }));

export const swapKeysValues = (list, toBeReplacedKey, toBeReplaceKeyValue) =>
  map(list, (item) => ({
    ...item,
    [toBeReplacedKey]: item[toBeReplaceKeyValue],
  }));
