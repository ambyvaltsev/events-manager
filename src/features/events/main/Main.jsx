import s from "./Main.module.scss";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../../components/UI/button/Button";
import { EventCreator } from "../../eventCreator/EventCreator";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const Main = () => {
  const navigator = useNavigate()
  const [isCreator, setIsCreator] = useState(false);
  const isAuth = useSelector(state => state.auth.entities.isAuth)
  const handleEventCreater = () => {
    isAuth ? setIsCreator(!isCreator) : navigator('/auth')
  };
  return (
    <div className={s.container}>
      <div className={s.btns}>
        <div className={s.btn}>
          <Button
            name="Add"
            onClick={handleEventCreater}
            style={{ fontSize: "18px", padding: "3px" }}
          />
        </div>
        <Link className={s.link} to="/">
          Week
        </Link>
        <Link className={s.link} to="month">
          Month
        </Link>
      </div>
      {isCreator && <EventCreator closeEventCreater={handleEventCreater} />}
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};
