import { useSelector} from "react-redux";
import { useEffect } from "react";
import { useActions } from "./useActions";
export const useShowError = () => {
  const {showAlert} = useActions()
  const errorEvents = useSelector((state) => state.events.error);
  const errorAuth = useSelector((state) => state.auth.error);
  
  useEffect(() => {
    if (errorEvents) {
      showAlert(errorEvents);
    }
    if (errorAuth) {
      showAlert(errorEvents);
    }
  }, [errorEvents, errorAuth]);

};
