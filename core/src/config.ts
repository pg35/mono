import { Id, Condition } from "./types";
export interface Keys {
  [key: Id]: {
    name: string;
    group: "Product" | "Customer";
    operatorIds: Id[];
    defaultValue: any;
    input: any;
  };
}
export interface Operators {
  [key: Id]: {
    name: string;
  };
}
export const keys: Keys = {
  1: {
    name: "Id",
    group: "Product",
    operatorIds: [1, 128 | 1],
    defaultValue: [],
    input: "multiselect",
  },
  2: {
    name: "Price",
    group: "Product",
    operatorIds: [3, 128 | 3],
    defaultValue: "",
    input: "text",
  },
  3: {
    name: "Category",
    group: "Product",
    operatorIds: [1, 128 | 1],
    defaultValue: [],
    input: "multiselect",
  },
  4: {
    name: "Tag",
    group: "Product",
    operatorIds: [1, 128 | 1],
    defaultValue: [],
    input: "multiselect",
  },
  256: {
    name: "Id",
    group: "Customer",
    operatorIds: [1, 128 | 1],
    defaultValue: [],
    input: "multiselect",
  },
  257: {
    name: "IP",
    group: "Customer",
    operatorIds: [2, 128 | 2],
    defaultValue: "",
    input: "text",
  },
  258: {
    name: "Logged in",
    group: "Customer",
    operatorIds: [4, 128 | 4],
    defaultValue: "",
    input: false,
  },
  259: {
    name: "Role",
    group: "Customer",
    operatorIds: [1, 128 | 1],
    defaultValue: "",
    input: "multiselect",
  },
};
export const operators = {
  1: {
    name: "in",
  },
  [128 | 1]: {
    name: "not in",
  },
  3: {
    name: "equal",
  },
  [128 | 3]: {
    name: "not equal",
  },
  2: {
    name: "int equal",
  },
  [128 | 2]: {
    name: "not int equal",
  },
  4: {
    name: "Yes",
  },
  [128 | 4]: {
    name: "No",
  },
};
