import s from "./Alert.module.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useActions } from "../../hooks/useActions";

export const Alert = () => {
  const { hideAlert } = useActions();
  const alert = useSelector((state) => state.alert.text);

  useEffect(() => {
    const timerId = setTimeout(() => hideAlert(), 3000);
    return () => clearTimeout(timerId);
  }, []);

  return <div className={s.container}>{alert}</div>;
};
