import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import classNames from "classnames";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { List } from "../reducers/listReducer";

export type RenderItemType<T> = (
  item: T,
  index: number,
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined,
  isDragging: boolean,
) => JSX.Element;

export type SortableListProps<T> = {
  list: List<T>;
  listId: string;
  renderItem: RenderItemType<T>;
  emptyListMsg: string;
};

export default function SortableList<T>(props: SortableListProps<T>) {
  const { list, listId, renderItem, emptyListMsg } = props;
  return (
    <div>
      {list.itemOrder.length ? (
        <StrictModeDroppable droppableId={listId} type={listId}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classNames("p-2 flex flex-col gap-2", {
                "bg-gray-200": snapshot.isDraggingOver,
              })}
            >
              {list.itemOrder.map((itemId: number, index: number) => {
                const item = list.items[itemId];
                return (
                  <Draggable
                    key={`${listId}_${itemId}`}
                    draggableId={`${listId}_${itemId}`}
                    index={index}
                  >
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot,
                    ) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={classNames({
                          "bg-gray-500": snapshot.isDragging,
                        })}
                      >
                        {renderItem(
                          item,
                          index,
                          provided.dragHandleProps,
                          snapshot.isDragging,
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      ) : (
        <div>{emptyListMsg}</div>
      )}
    </div>
  );
}
