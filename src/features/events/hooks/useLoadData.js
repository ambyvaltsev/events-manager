import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";

export const useLoadData = () => {
  const { loadEvents, getAllGuests } = useActions();
  const { isAuth, login } = useSelector((state) => state.auth.entities);
  const { guest, guests } = useSelector((state) => state.events.entities);
  useEffect(() => {
    if (isAuth) {
      login === "admin" && getAllGuests();
    }
  }, [isAuth, login]);

  useEffect(() => {
    if (isAuth && guests.length !== 0) {
      loadEvents();
    }
  }, [isAuth, guests, guest]);
};
