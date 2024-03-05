import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Id, Condition } from "../types";
import { keys, operators } from "../config";
import { doAjax } from "../ajax";

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};
(window as any).ajaxurl = "https://knn9yx-8080.csb.app/";

const loadOptions = (inputValue: string, callback: (options: any) => void) => {
  doAjax({ data: { keyId: 1, q: inputValue } }, (arr: []) => {
    const options = arr.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    callback(options);
  });
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 1000);
};

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
    e:
      | React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
      | {
          target: { name: string; value: any };
        },
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

      <AsyncSelect
        className="flex-grow basis-64"
        cacheOptions
        loadOptions={loadOptions}
        isClearable
        isMulti
        defaultOptions={[]}
        placeholder="Type at least one character"
        loadingMessage={(obj) => (
          <span>
            Searching for <strong>{obj.inputValue}</strong>
          </span>
        )}
        noOptionsMessage={(obj) =>
          !obj.inputValue ? (
            "Found items will be listed here"
          ) : (
            <span>
              No items found for <strong>{obj.inputValue}</strong>
            </span>
          )
        }
        value={condition.value}
        onChange={(options: any) => {
          handleChange({
            target: {
              name: "value",
              value: options,
            },
          });
        }}
      />
      {/*<input
        type="text"
        value={condition.value as unknown as string}
        onChange={handleChange}
        name="value"
        />*/}
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
