import React, { useState, useCallback, useReducer } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  useListReducer,
  List,
  Id,
  ListAction,
  listReducer,
} from "./reducers/listReducer";
import SortableList, { RenderItemType } from "./components/SortableList";
import { Condition, Rule, Union } from "./types";
import { createRule } from "./utils";
import RuleComponent from "./components/Rule";

const emptyList2: List<Condition> = {
  items: {},
  itemOrder: [],
  selected: null,
};
const emptyList: List<Rule> = {
  items: {},
  itemOrder: [],
  selected: null,
};

interface App {
  fees: List<Rule>;
}
type RuleAction = ListAction<Rule> & { listId: "fees" };
type ConditionAction = ListAction<Condition> & {
  listId: "fees";
  ruleId: number;
};
type Dispatch = React.Dispatch<RuleAction | ConditionAction>;

function reducer(state: App, action: RuleAction | ConditionAction) {
  if ("fees" === action.listId) {
    let fees = null;
    if ("undefined" !== typeof (action as ConditionAction).ruleId) {
      const conditionAction = action as ConditionAction;
      fees = {
        ...state.fees,
        items: {
          ...state.fees.items,
          [conditionAction.ruleId]: {
            ...state.fees.items[conditionAction.ruleId],
            conditions: listReducer(
              state.fees.items[conditionAction.ruleId].conditions,
              action as ListAction<Condition>,
            ),
          },
        },
      };
    } else {
      fees = listReducer(state.fees, action as ListAction<Rule>);
    }
    return {
      ...state,
      fees,
    };
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, { fees: emptyList });
  const renderItem: RenderItemType<Rule> = (
    item,
    index,
    dragHandleProps,
    isDragging,
  ) => (
    <div className="border-b-2 border-gray-900 p-b-">
      <RuleComponent
        rule={item}
        dispatch={dispatch}
        dragHandleProps={dragHandleProps}
      />
    </div>
  );
  return (
    <DragDropContext
      onDragEnd={(result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (
          source.droppableId !== destination.droppableId ||
          (source.droppableId === destination.droppableId &&
            source.index === destination.index)
        ) {
          return;
        }
        const action: RuleAction | ConditionAction = {
          listId: "fees",
          type: "swap_items",
          aItemId: source.index,
          bItemId: destination.index,
        };
        const toks = destination.droppableId.split(".");
        if (toks.length > 1) {
          (action as ConditionAction).ruleId = Number(toks[1]);
        }
        dispatch(action);
      }}
    >
      <div className="">
        <SortableList
          list={state.fees}
          listId="fees"
          emptyListMsg="fee list is empty"
          renderItem={renderItem}
        />
        <button
          onClick={() =>
            dispatch({ type: "add_item", listId: "fees", item: createRule() })
          }
        >
          Add Rule
        </button>
      </div>
    </DragDropContext>
  );
}

export default App;
