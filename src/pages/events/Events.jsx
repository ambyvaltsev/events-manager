import s from "./Events.module.scss";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/UI/button/Button";
import { EventCreator, CompletedEvents, EventOption } from "./components";
import { useSelector } from "react-redux";
import { useLoadData, useCheckCompletedEvents } from "./hooks";
import { useShowError } from "../../components/alert/useShowError";
import { Alert } from "../../components/alert/Alert";
import { useActions} from '../../hooks/'

export const Events = () => {
  const {selectUser} = useActions()
  const { usersNames, user } = useSelector((state) => state.users.entities);
  const { events } = useSelector((state) => state.events.entities);
  const completedEvents = useCheckCompletedEvents(events);
  const alert = useSelector((state) => state.alert);
  const navigator = useNavigate();
  const [isCreator, setIsCreator] = useState(false);
  const { isAuth, login } = useSelector((state) => state.auth.entities);
  const handleEventCreater = () => {
    isAuth ? setIsCreator(!isCreator) : navigator("/auth");
  };
  useLoadData();
  useShowError();
  return (
    <div className={s.container}>
      <div className={s.btns}>
        <div className={s.btns__admin}>
          {login === "admin" && (
            <>
              <Button
                name="Add"
                onClick={handleEventCreater}
                style={{ fontSize: "22px", padding: "5px 10px" }}
              />
              <EventOption
                onClick={(e) => selectUser(e.target.textContent)}
                list={usersNames}
                defaultValue={user}
              />
            </>
          )}
        </div>
        <div className={s.btns__links}>
          <Link className={s.link} to="/">
            Week
          </Link>
          <Link className={s.link} to="/month">
            Month
          </Link>
        </div>
      </div>
      {isCreator && <EventCreator closeEventCreater={handleEventCreater} />}

      <div className={s.content}>
        <Outlet />
      </div>
      {alert.status && <Alert />}
      {completedEvents.length > 0 && <CompletedEvents completedEvents={completedEvents} />}
    </div>
  );
};
