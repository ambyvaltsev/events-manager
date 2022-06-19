import s from "./CompletedEvents.module.scss";
import { weekFull, months } from "../../assets/date_arrays";
import { useNavigate } from "react-router-dom";
import { Button } from "../UI/button/Button";
import { useDispatch } from "react-redux";
import { postponeEvent } from "../../features/events/events-slice";
import { removeEvent } from "../../features/events/events-slice";

export const CompletedEvent = ({ event, index }) => {
  const navigator = useNavigate();
  const { id, date, day, month } = event;
  const dispatch = useDispatch();
  const handlePostponeEvent = () => {
    dispatch(postponeEvent(id));
  };
  const handleRemoveEvent = () => {
    dispatch(removeEvent(event));
  };
  return (
    <div className={s.event}>
      <div className={s.body}>
        <div className={s.index}>{`${index}.`}</div>
        <div className={s.date}>{`${weekFull[day - 1]}, ${date} ${months[month].toLowerCase()}`}</div>
      </div>
      <div className={s.btnsArea}>
        <Button
          name="See more"
          style={{ fontSize: "14px", padding: "3px", border: "1px solid" }}
          onClick={() => navigator(`/event/${id}`)}
        ></Button>
        <Button
          name="Postpone"
          style={{ fontSize: "14px", padding: "3px", border: "1px solid" }}
          onClick={handlePostponeEvent}
        ></Button>
        <Button
          name="Delete"
          style={{ fontSize: "14px", padding: "3px", border: "1px solid" }}
          onClick={handleRemoveEvent}
        ></Button>
      </div>
    </div>
  );
};
