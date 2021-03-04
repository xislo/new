import get from "lodash/get";
import filter from "lodash/filter";
import includes from "lodash/includes";
import size from "lodash/size";
import head from "lodash/head";
import countBy from "lodash/countBy";
import map from "lodash/map";
import compact from "lodash/compact";
import isNil from "lodash/isNil";

export const getAttributes = (data) => get(data, "attributes");

export const getSelectedItems = (list) =>
  compact(map(list, (item) => (item.selected ? item : null)));

export const getSelectedItemIds = (list) =>
  map(getSelectedItems(list), (item) => item.id);

//todo: suggested name removeFromListIfExists
export const removeMany = (list, item) => {
  return filter(list, (Obj) => !includes(item, Obj.id));
};

export const removeOne = (list, id) => {
  return filter(list, (item) => item.id !== id);
};

export const selectFieldMeta = (metaList, field_name = "status") => {
  const status = head(
    filter(metaList.fields, (item) => item.field_name === field_name)
  );
  return !isNil(status) ? get(status, "sys_field_values", []) : [];
};

export const selectStatusDescription = (list, value) => {
  return size(list) > 0
    ? get(head(filter(list, ["value", value])), ["description"], "")
    : "";
};

export const countSelectedItem = (list) =>
  countBy(list, (item) => item.selected === true).true;

export const selectValuesFromFlatList = (list, key) =>
  map(list, (item) => item[key]);

export const selectFilteredObjectsFromFlatList = (
  sourceList,
  compareSourceKey,
  excludeSelectedValues
) => {
  return filter(
    sourceList,
    (item) => !includes(excludeSelectedValues, item[compareSourceKey])
  );
};

export const CreateModuleSelectors = (baseKey) => {
  const selectList = (state) => {
    return get(state, `${baseKey}.list`, []);
  };

  const selectItem = (state) => get(state, `${baseKey}.item`, []);

  const selectMeta = (state) => get(state, `${baseKey}.meta`, []);

  const selectSelectedTotal = (state) => {
    return get(state, `${baseKey}.selectedTotal`);
  };

  return { selectList, selectItem, selectSelectedTotal, selectMeta };
};
