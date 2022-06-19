import { useEffect} from "react";
import { loadEvents } from "../features/events/events-slice";
import { useDispatch, useSelector } from "react-redux";



export const useLoadData = () => {
  const isAuth = useSelector(state => state.auth.entities.isAuth)
  const dispatch = useDispatch();
  useEffect(() => {

    if (isAuth) {
      dispatch(loadEvents())
    }
  }, [isAuth]);

};
