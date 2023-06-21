import * as UserActionCreators from "./user";
import * as TodoActionCreators from "./todo";

const ActionCreators = {
  ...UserActionCreators,
  ...TodoActionCreators
};

export default ActionCreators;
