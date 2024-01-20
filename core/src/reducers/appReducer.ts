export const INIT_APP = "INIT_APP";
export const EDIT_UI = "EDIT_UI";

export const uiState = {
  loading: true,
  dirty: false,
  save: {
    doing: false,
    result: null,
  },
};

export function createAction(type: string, data = {}) {
  return {
    type,
    data,
  };
}
export function createListAction(listType: string, type: string, data = {}) {
  return { listType, ...createAction(type, data) };
}
export function reducer(state: any, action: any) {
  switch (action.type) {
    case INIT_APP:
      return { ui: uiState, ...action.data };
    case EDIT_UI:
      return {
        ...state,
        ui: { ...state.ui, ...action.data },
      };
    default:
      throw new Error("unknown list action " + action.type);
  }
}
