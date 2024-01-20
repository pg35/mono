import React, { useState, useCallback, useReducer } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  useListReducer,
  ListType,
  ADD_ITEM,
  SWAP_ITEMS,
} from "./reducers/listReducer";
import SortableList, { RenderItemType } from "./components/SortableList";

export interface ConditionType {
  id: number;
  keyId: number;
  opId: number;
  value: string | number | boolean | string[] | number[];
}
function Condition(props: ConditionType) {
  return <span className="font-bold">{props.id}</span>;
}

let nextId = 0;
function createCondition(): ConditionType {
  return { id: ++nextId, keyId: 0, opId: 0, value: "" };
}
const emptyList: ListType<ConditionType> = {
  items: {},
  itemOrder: [],
  selected: null,
};

function App() {
  const [list, dispatch] = useListReducer(emptyList);
  const renderItem: RenderItemType<ConditionType> = (
    item,
    index,
    dragHandleProps,
    isDragging,
  ) => (
    <div
      {...dragHandleProps}
      className="w-full h-8 border border-gray-300 text-center"
    >
      <Condition {...item} />
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
          source.droppableId === destination.droppableId &&
          source.index === destination.index
        ) {
          return;
        }
        dispatch({
          type: SWAP_ITEMS,
          from: source.index,
          to: destination.index,
        });
      }}
    >
      <div className="p-4 w-48 mx-auto">
        <SortableList
          list={list}
          listId="abc"
          emptyListMsg="list is empty"
          renderItem={renderItem}
        />
        <button
          onClick={() => dispatch({ type: ADD_ITEM, item: createCondition() })}
        >
          Add
        </button>
      </div>
    </DragDropContext>
  );
}

export default App;
