import { List } from "./reducers/listReducer";
import { keys, operators } from "./config";

export type Id = number;
export type Union<T, U> = {
  [Property in keyof T | keyof U]: Property extends keyof T
    ? T[Property]
    : Property extends keyof U
      ? U[Property]
      : never;
};
interface BaseCondition {
  id: Id;
  keyId: keyof typeof keys;
}
interface LimitedItems<Item> {
  limit: number;
  value: Item[];
}
export interface NumericComparison extends BaseCondition {
  opId: 2 | 130 | 3 | 131; //">" | "<" | ">=" | "<=" | "==" | "!=";
  value: { value: Id; label: string }[];
}
export interface BooleanComparison extends BaseCondition {
  opId: 4 | 132;
  value: null;
}
export type AtmostSelected<T> = Union<
  BaseCondition,
  Union<{ opId: "atmost" }, LimitedItems<T>>
>;
export type AtleastSelected<T> = Union<
  BaseCondition,
  Union<{ opId: "atleast" }, LimitedItems<T>>
>;
export type AllSelected<T> = Union<
  BaseCondition,
  { opId: "same as"; value: T[] }
>;
export type NoneSelected<T> = Union<
  BaseCondition,
  { opId: "not same as"; value: T[] }
>;
type Option = {
  value: Id;
  label: string;
};

export type Condition = NumericComparison | BooleanComparison;
/* | AtmostSelected<number>
  | AtleastSelected<number>
  | AllSelected<number>
  | NoneSelected<number>;
  */
export interface Rule {
  id: Id;
  name: string;
  info: string;
  conditions: List<Condition>;
}
