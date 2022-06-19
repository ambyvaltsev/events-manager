import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showAlert } from "../features/alert/alert-slice";

export const useShowError = () => {
  const dispatch = useDispatch();
  const errorEvents = useSelector((state) => state.events.error);
  const errorAuth = useSelector((state) => state.auth.error);
  useEffect(() => {
    if (errorEvents) {
      dispatch(showAlert(errorEvents));
    }
    if (errorAuth) {
      dispatch(showAlert(errorEvents));
    }
  }, [errorEvents, errorAuth]);

};
