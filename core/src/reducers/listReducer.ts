import { useReducer } from "react";

export type Id = number;
export interface List<T> {
  items: { [id: Id]: T };
  itemOrder: Id[];
  selected: Id | null;
}
export type ListAction<T> =
  | {
      type: "add_item" | "update_item";
      item: T;
    }
  | { type: "swap_items"; aItemId: Id; bItemId: Id }
  | { type: "remove_item" | "select_item"; itemId: Id };

export function useListReducer<T extends { id: Id }>(initialState: List<T>) {
  function reducer(state: List<T>, action: ListAction<T>): List<T> {
    switch (action.type) {
      case "add_item":
        return {
          ...state,
          items: { ...state.items, [action.item.id]: action.item },
          itemOrder: state.itemOrder.concat(action.item.id),
        };
      case "update_item":
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
      case "remove_item":
        const newState = {
          ...state,
          items: { ...state.items },
          itemOrder: state.itemOrder.filter(
            (itemId) => itemId !== action.itemId,
          ),
          selected: state.selected === action.itemId ? null : state.selected,
        };
        delete newState.items[action.itemId];
        return newState;
      case "select_item":
        return {
          ...state,
          selected: action.itemId,
        };
      case "swap_items":
        const newState2 = { ...state, itemOrder: [...state.itemOrder] };
        const temp = newState2.itemOrder[action.bItemId];
        newState2.itemOrder[action.bItemId] =
          newState2.itemOrder[action.aItemId];
        newState2.itemOrder[action.aItemId] = temp;
        return newState2;
      default:
        const _exhaustiveCheck: never = action;
        return _exhaustiveCheck;
    }
  }
  return useReducer(reducer, initialState);
}
