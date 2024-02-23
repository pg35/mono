import React, { useState, useCallback, useReducer } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useListReducer, List, Id } from "./reducers/listReducer";
import SortableList, { RenderItemType } from "./components/SortableList";

export interface Condition {
  id: Id;
  keyId: number;
  opId: number;
  value: string | number | boolean | string[] | number[];
}
function Condition(props: Condition) {
  return <span className="font-bold">{props.id}</span>;
}

let nextId = 0;
function createCondition(): Condition {
  return { id: ++nextId, keyId: 0, opId: 0, value: "" };
}
const emptyList: List<Condition> = {
  items: {},
  itemOrder: [],
  selected: null,
};

function App() {
  const [list, dispatch] = useListReducer(emptyList);
  const renderItem: RenderItemType<Condition> = (
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
          type: "swap_items",
          aItemId: source.index,
          bItemId: destination.index,
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
          onClick={() =>
            dispatch({ type: "add_item", item: createCondition() })
          }
        >
          Add
        </button>
      </div>
    </DragDropContext>
  );
}

export default App;
