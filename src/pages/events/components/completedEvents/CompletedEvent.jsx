import s from "./CompletedEvents.module.scss";
import { weekFull, months } from "../../../../utils/date_arrays";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/UI/button/Button";
import { useActions } from "../../../../hooks/useActions";
import { useSelector } from "react-redux";

export const CompletedEvent = ({ event, index }) => {
  const { login } = useSelector((state) => state.auth.entities);
  const { removeEvent, postponeEvent } = useActions();
  const navigator = useNavigate();
  const { id, date, day, month } = event;
  const handlePostponeEvent = () => {
    postponeEvent(id);
  };
  const handleRemoveEvent = () => {
    removeEvent(event);
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
        {login === "admin" && (
          <Button
            name="Delete"
            style={{ fontSize: "14px", padding: "3px", border: "1px solid" }}
            onClick={handleRemoveEvent}
          ></Button>
        )}
      </div>
    </div>
  );
};
