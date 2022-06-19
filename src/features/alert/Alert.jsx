import s from "./Alert.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideAlert } from "./alert-slice";

export const Alert = () => {
  const alert = useSelector((state) => state.alert.text);
  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(() => dispatch(hideAlert()), 3000);
    return () => clearTimeout(timerId);
  });

  return <div className={s.container}>{alert}</div>;
};
