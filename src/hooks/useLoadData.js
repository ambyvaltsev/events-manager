import { useEffect } from "react";
import { loadEvents } from "../features/events/events-slice";
import { useDispatch, useSelector } from "react-redux";

export const useLoadData = () => {
  const {isAuth, login} = useSelector((state) => state.auth.entities);
  const {guest, guests} = useSelector(state => state.events.entities)
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(loadEvents());
    }
  }, [isAuth, guest]);
};
