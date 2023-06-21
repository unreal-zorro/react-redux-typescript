import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers/indes";

export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector;
