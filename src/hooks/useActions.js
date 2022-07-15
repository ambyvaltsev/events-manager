import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { allActions } from "../features/actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
