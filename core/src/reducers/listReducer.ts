import { useReducer } from "react";

export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SELECT_ITEM = "SELECT_ITEM";
export const SWAP_ITEMS = "SWAP_ITEMS";

export interface ListType<T> {
  items: { [id: number]: T };
  itemOrder: number[];
  selected: number | null;
}
export type ListActionType<T> =
  | {
      type:
        | typeof ADD_ITEM
        | typeof EDIT_ITEM
        | typeof REMOVE_ITEM
        | typeof SELECT_ITEM;
      item: T;
    }
  | { type: typeof SWAP_ITEMS; from: number; to: number };

export function useListReducer<T extends { id: number }>(
  initialState: ListType<T>,
) {
  function reducer(state: ListType<T>, action: ListActionType<T>): ListType<T> {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...state,
          items: { ...state.items, [action.item.id]: action.item },
          itemOrder: state.itemOrder.concat(action.item.id),
        };
      case EDIT_ITEM:
        return {
          ...state,
          items: {
            ...state.items,
            [action.item.id]: {
              ...state.items[action.item.id],
              ...action.item,
            },
          },
        };
      case REMOVE_ITEM:
        const newState = {
          ...state,
          items: { ...state.items },
          itemOrder: state.itemOrder.filter(
            (itemId) => itemId !== action.item.id,
          ),
          selected: state.selected === action.item.id ? null : state.selected,
        };
        delete newState.items[action.item.id];
        return newState;
      case SELECT_ITEM:
        return {
          ...state,
          selected: action.item.id,
        };
      case SWAP_ITEMS:
        const newState2 = { ...state, itemOrder: [...state.itemOrder] };
        const temp = newState2.itemOrder[action.from];
        newState2.itemOrder[action.from] = newState2.itemOrder[action.to];
        newState2.itemOrder[action.to] = temp;
        return newState2;
      default:
        const _exhaustiveCheck: never = action;
        return _exhaustiveCheck;
    }
  }
  return useReducer(reducer, initialState);
}
