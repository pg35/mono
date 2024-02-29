import React, { useState, useCallback, useReducer } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Condition, Rule, Union } from "./types";
import SortableList, { RenderItemType } from "./components/SortableList";
import RuleComponent from "./components/Rule";
import { reducer, RuleAction, ConditionAction } from "./reducers/appReducer";
import { createEmptyList } from "./reducers/listReducer";
import { createRule } from "./utils";

//type Dispatch = React.Dispatch<RuleAction | ConditionAction>;

function App() {
  const [state, dispatch] = useReducer(reducer, { fees: createEmptyList() });
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
