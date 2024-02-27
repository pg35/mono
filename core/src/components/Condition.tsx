import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Condition } from "../types";

export default function ConditionComponent({
  condition,
  dispatch,
  dragHandleProps,
}: {
  condition: Condition;
  dispatch: any;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}) {
  return (
    <div className="flex border gap-2">
      <div {...dragHandleProps} className="w-4 h-4 bg-green-500" />
      <span>
        {condition.opId} {condition.id}
      </span>
    </div>
  );
}
