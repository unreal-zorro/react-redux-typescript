import {useTypesDispatch} from "./useTypesDispatch";
import {bindActionCreators} from "redux";
import ActionCreators from "../store/action-creators/";

export const useActions = () => {
  const dispatch = useTypesDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
