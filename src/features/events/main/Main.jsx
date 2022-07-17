import s from "./Main.module.scss";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../../components/UI/button/Button";
import { EventCreator } from "../../eventCreator/EventCreator";
import { useSelector } from "react-redux";
import { EventOption } from "../../../components/eventOption/EventOption";
import { useActions, useShowError, useLoadData } from "../../../hooks";
import { Alert } from "../../alert/Alert";
import { CompletedEvents } from "../../../components/completedEvents/CompletedEvents";
import { useCheckCompletedEvents } from "./useCheckCompletedEvents";


export const Main = () => {
  const {guestsNames, guest, events }= useSelector((state) => state.events.entities);
  const completedEvents = useCheckCompletedEvents(events);
  const alert = useSelector((state) => state.alert);
  const { getAllGuests } = useActions();
  const navigator = useNavigate();
  const [isCreator, setIsCreator] = useState(false);
  const { isAuth, login } = useSelector((state) => state.auth.entities);
  const handleEventCreater = () => {
    isAuth ? setIsCreator(!isCreator) : navigator("/auth");
  };
  useEffect(() => {
    login === 'admin' && getAllGuests();
  }, []);
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
              <EventOption list={guestsNames} defaultValue={guest} optionDataset="option-selectedGuest" />
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
