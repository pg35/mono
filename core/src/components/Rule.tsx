import SortableList, { RenderItemType } from "./SortableList";
import { Condition, Rule, Union } from "../types";
import { createCondition } from "../utils";

import ConditionComponent from "./Condition";

export default function RuleComponent({
  rule,
  dispatch,
  dragHandleProps,
}: {
  rule: Rule;
  dispatch: any;
  dragHandleProps: any;
}) {
  const renderItem: RenderItemType<Condition> = (
    item,
    index,
    dragHandleProps,
    isDragging,
  ) => (
    <div className="">
      <ConditionComponent
        condition={item}
        dispatch={dispatch}
        dragHandleProps={dragHandleProps}
        ruleId={rule.id}
      />
    </div>
  );
  return (
    <div className="flex flex-col gap-4 justify-start">
      <div {...dragHandleProps} className="w-8 h-8 bg-blue-500">
        <span className="text-white text-sm text-bold">{rule.id}</span>
      </div>
      <label className="flex flex-row gap-2">
        Name:{" "}
        <input
          type="text"
          value={rule.name}
          className="w-full border-1"
          onChange={(e) =>
            dispatch({
              listId: "fees",
              type: "update_item",
              item: { ...rule, name: e.target.value },
            })
          }
        />
      </label>
      <label>
        Info:{" "}
        <input
          type="text"
          value={rule.info}
          onChange={(e) =>
            dispatch({
              listId: "fees",
              type: "update_item",
              item: { ...rule, info: e.target.value },
            })
          }
        />
      </label>
      <label>Conditions:</label>
      <SortableList
        list={rule.conditions}
        listId={`fees.${rule.id}`}
        emptyListMsg="condition list is empty"
        renderItem={renderItem}
      />
      <button
        onClick={() =>
          dispatch({
            listId: "fees",
            ruleId: rule.id,
            type: "add_item",
            item: createCondition(),
          })
        }
      >
        Add condition
      </button>
    </div>
  );
}
