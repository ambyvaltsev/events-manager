import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";

export const useLoadData = () => {
  const { loadEvents, getUsers } = useActions();
  const { isAuth, login } = useSelector((state) => state.auth.entities);
  const { user, users } = useSelector((state) => state.users.entities);
  useEffect(() => {
    if (isAuth) {
      login === "admin" && getUsers();
    }
  }, [isAuth, login]);

  useEffect(() => {
    if (isAuth && users.length !== 0) {
      loadEvents();
    }
  }, [isAuth, users, user]);
};
