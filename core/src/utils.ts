import { Condition, Rule } from "./types";
import { List, createEmptyList } from "./reducers/listReducer";

let nextId = 0;
export function getNextId() {
  return ++nextId;
}
export function fail(message: string): never {
  throw new Error(message);
}
export function createCondition(): Condition {
  return { id: getNextId(), keyId: 2, opId: 3, value: [] };
}
/*
export function createCondition2(): Condition {
  let b = Math.floor(Math.random() * 6);
  switch (b) {
    case 0:
      return {
        id: getNextId(),
        keyId: 0,
        opId: "atmost",
        limit: 2,
        value: [5],
      };
    case 1:
      return {
        id: getNextId(),
        keyId: 0,
        opId: "atleast",
        limit: 2,
        value: [2],
      };
    case 2:
      return { id: getNextId(), keyId: 0, opId: 3, value: 345.345 };
    case 3:
      return { id: getNextId(), keyId: 0, opId: 131, value: 5 };
    case 4:
      return { id: getNextId(), keyId: 0, opId: "same as", value: [2] };
    case 5:
      return { id: getNextId(), keyId: 0, opId: "not same as", value: [2] };
    default:
      return fail("Unexhaustive!");
  }
}
*/
export function createRule(): Rule {
  return {
    id: getNextId(),
    name: "",
    info: "",
    conditions: createEmptyList(),
  };
}
