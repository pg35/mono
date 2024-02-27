import { Id, List } from "./reducers/listReducer";

export type Union<T, U> = {
  [Property in keyof T | keyof U]: Property extends keyof T
    ? T[Property]
    : Property extends keyof U
      ? U[Property]
      : never;
};

interface BaseCondition {
  id: Id;
  keyId: Id;
}
interface LimitedItems<Item> {
  limit: number;
  value: Item[];
}
export interface NumericComparison extends BaseCondition {
  opId: ">" | "<" | ">=" | "<=" | "==" | "!=";
  value: number;
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
export type Condition =
  | NumericComparison
  | AtmostSelected<number>
  | AtleastSelected<number>
  | AllSelected<number>
  | NoneSelected<number>
  | NumericComparison;
export interface Rule {
  id: Id;
  name: string;
  info: string;
  conditions: List<Condition>;
}
