export const BaseBegin = (type) => ({ type });

export const BaseError = (type, error) => ({
  type,
  data: error,
});

export const BasePayload = (type, { data, meta }) => {
  return {
    type,
    data,
    meta,
  };
};

export const BaseWithSelectedIds = (type, { data, selected_ids, meta }) => ({
  type,
  data,
  selected_ids,
  meta,
});

export const BaseMarkAllSelected = (type, { data, selected }) => ({
  type,
  data,
  selected,
});

export const CreateModuleActions = (BASE) => {
  // Action Constants
  const BEGIN = `${BASE}_BEGIN`;
  const SUCCESS = `${BASE}_SUCCESS`;
  const FAILURE = `${BASE}_FAILURE`;

  const LIST_BEGIN = `${BASE}_LIST_BEGIN`;
  const LIST_SUCCESS = `${BASE}_LIST_SUCCESS`;
  const LIST_FAILURE = `${BASE}_LIST_FAILURE`;

  const SEARCH_BEGIN = `${BASE}_SEARCH_BEGIN`;
  const SEARCH_SUCCESS = `${BASE}_SEARCH_SUCCESS`;
  const SEARCH_FAILURE = `${BASE}_SEARCH_FAILURE`;

  const MARK_SELECTED = `${BASE}_MARK_SELECTED`;
  const MARK_ALL_SELECTED = `${BASE}_MARK_ALL_SELECTED`;

  const DELETE_SELECTED_BEGIN = `${BASE}_DELETE_SELECTED_BEGIN`;
  const DELETE_SELECTED_SUCCESS = `${BASE}_DELETE_SELECTED_SUCCESS`;
  const DELETE_SELECTED_FAILURE = `${BASE}_DELETE_SELECTED_FAILURE`;

  const CREATE_BEGIN = `${BASE}_CREATE_BEGIN`;
  const CREATE_SUCCESS = `${BASE}_CREATE_SUCCESS`;
  const CREATE_FAILURE = `${BASE}_CREATE_FAILURE`;

  const UPDATE_BEGIN = `${BASE}_UPDATE_BEGIN`;
  const UPDATE_SUCCESS = `${BASE}_UPDATE_SUCCESS`;
  const UPDATE_FAILURE = `${BASE}_UPDATE_FAILURE`;

  const HANDLE_META = `${BASE}_HANDLE_META`;

  // Action creators

  // Fetch Single Location
  const Begin = () => BaseBegin(BEGIN);
  const Success = (payload) => BasePayload(SUCCESS, payload);
  const Failure = (error) => BaseError(FAILURE, error);

  // Fetch list
  const ListBegin = (payload) => BaseBegin(LIST_BEGIN, payload);
  const ListSuccess = ({ data, meta }) => {
    return BasePayload(LIST_SUCCESS, { data, meta });
  };
  const ListFailure = (error) => BaseError(LIST_FAILURE, error);

  // Search
  const SearchBegin = (payload) => BaseBegin(SEARCH_BEGIN, payload);
  const SearchSuccess = ({ data }) => BasePayload(SEARCH_SUCCESS, { data });
  const SearchFailure = (error) => BaseError(SEARCH_FAILURE, error);

  // delete
  const DeleteSelectedBegin = (payload) =>
    BaseBegin(DELETE_SELECTED_BEGIN, payload);
  const DeleteSelectedSuccess = ({ payload, selected_ids, meta }) =>
    BaseWithSelectedIds(DELETE_SELECTED_SUCCESS, {
      payload,
      selected_ids,
      meta,
    });
  const DeleteSelectedFailure = (error) =>
    BasePayload(DELETE_SELECTED_FAILURE, error);

  // Create
  const CreateBegin = (payload) => BaseBegin(CREATE_BEGIN, payload);
  const CreateSuccess = (payload) => BasePayload(CREATE_SUCCESS, payload);
  const CreateFailure = (error) => BaseError(CREATE_FAILURE, error);

  // Update
  const UpdateBegin = (payload) => BaseBegin(UPDATE_BEGIN, payload);
  const UpdateSuccess = (payload) => BasePayload(UPDATE_SUCCESS, payload);
  const UpdateFailure = (error) => BaseError(UPDATE_FAILURE, error);

  // MARK AS SELECTED IN REDUX
  const MarkSelected = (data) => BasePayload(MARK_SELECTED, { data });
  const MarkAllSelected = ({ data, selected }) =>
    BaseMarkAllSelected(MARK_ALL_SELECTED, { data, selected });

  // returns meta data
  const HandleMeta = (data) => ({
    type: HANDLE_META,
    data: data,
  });

  return {
    BEGIN,
    SUCCESS,
    FAILURE,
    LIST_BEGIN,
    LIST_SUCCESS,
    LIST_FAILURE,
    SEARCH_BEGIN,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    CREATE_BEGIN,
    CREATE_SUCCESS,
    CREATE_FAILURE,
    UPDATE_BEGIN,
    UPDATE_SUCCESS,
    UPDATE_FAILURE,
    DELETE_SELECTED_BEGIN,
    DELETE_SELECTED_SUCCESS,
    DELETE_SELECTED_FAILURE,
    MARK_ALL_SELECTED,
    MARK_SELECTED,
    HANDLE_META,
    Begin,
    Success,
    Failure,
    ListBegin,
    ListSuccess,
    ListFailure,
    SearchBegin,
    SearchSuccess,
    SearchFailure,
    CreateBegin,
    CreateSuccess,
    CreateFailure,
    UpdateBegin,
    UpdateSuccess,
    UpdateFailure,
    DeleteSelectedBegin,
    DeleteSelectedSuccess,
    DeleteSelectedFailure,
    MarkSelected,
    MarkAllSelected,
    HandleMeta,
  };
};
