import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Id, Condition } from "../types";
import { keys, operators } from "../config";

export default function ConditionComponent({
  condition,
  dispatch,
  dragHandleProps,
  ruleId,
}: {
  condition: Condition;
  dispatch: any;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  ruleId: Id;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) =>
    dispatch({
      listId: "fees",
      ruleId: ruleId,
      type: "update_item",
      item: {
        ...condition,
        [e.target.name]: e.target.value,
      },
    });
  return (
    <div className="flex flex-wrap justify-start gap-2">
      <div
        {...dragHandleProps}
        className="flex-shrink-0 w-8 h-8 p-1 bg-green-500 text-center"
      >
        <span>{condition.id}</span>
      </div>
      <select
        value={condition.keyId}
        onChange={handleChange}
        name="keyId"
        className="basis-36 md:flex-grow-0 md:flex-shrink-0"
      >
        {getKeyOptions()}{" "}
      </select>
      <select
        value={condition.opId}
        onChange={handleChange}
        name="opId"
        className="basis-36 md:flex-grow-0 md:flex-shrink-0"
      >
        {getOperatorOptions(condition.keyId)}
      </select>
      <input
        type="text"
        value={condition.value as unknown as string}
        onChange={handleChange}
        name="value"
      />
    </div>
  );
}
type Cache = {
  [key: string]: any;
};

const cache: Cache = {};

export function getKeyOptions() {
  const cacheKey = "keys";
  if (cache[cacheKey]) return cache[cacheKey];
  const groups: { [key: string]: JSX.Element[] } = {};
  Object.keys(keys).forEach((keyId) => {
    var key = keys[keyId as unknown as Id];
    if (!groups[key.group]) groups[key.group] = [];
    groups[key.group].push(
      <option value={keyId} key={keyId}>
        {key.group} {key.name}
      </option>,
    );
  });
  const optGroups = Object.keys(groups).map((group) => (
    <optgroup label={group}>{groups[group]}</optgroup>
  ));
  cache[cacheKey] = optGroups;
  return optGroups;
}

export function getOperatorOptions(keyId: Id) {
  const cacheKey = `oprators_${keyId}`;
  if (cache[cacheKey]) return cache[cacheKey];
  const options = keys[keyId].operatorIds.map((opId) => (
    <option value={opId} key={opId}>
      {operators[opId].name}
    </option>
  ));
  cache[cacheKey] = options;
  return options;
}
