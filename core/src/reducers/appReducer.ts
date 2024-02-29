import { listReducer, List, ListAction } from "./listReducer";
import { Rule, Condition } from "../types";

interface App {
  fees: List<Rule>;
}
export type RuleAction = ListAction<Rule> & { listId: "fees" };
export type ConditionAction = ListAction<Condition> & {
  listId: "fees";
  ruleId: number;
};

export function reducer(state: App, action: RuleAction | ConditionAction) {
  console.log("action", action);
  if ("fees" === action.listId) {
    let fees = null;
    if ("undefined" !== typeof (action as ConditionAction).ruleId) {
      const conditionAction = action as ConditionAction;
      fees = {
        ...state.fees,
        items: {
          ...state.fees.items,
          [conditionAction.ruleId]: {
            ...state.fees.items[conditionAction.ruleId],
            conditions: listReducer(
              state.fees.items[conditionAction.ruleId].conditions,
              action as ListAction<Condition>,
            ),
          },
        },
      };
    } else {
      fees = listReducer(state.fees, action as ListAction<Rule>);
    }
    return {
      ...state,
      fees,
    };
  }
  return state;
}
