import s from "./EventCreator.module.scss";
import { Calendar, EventOption } from "../../components";
import { Button } from "../../../../components/UI/button/Button";
import { time } from "../../../../utils/date_arrays";
import { Input } from "../../../../components/UI/input/Input";
import { useSelector } from "react-redux";
import { useActions } from "../../../../hooks/useActions";

export const EventCreator = ({ closeEventCreater }) => {
  const { usersNames } = useSelector((state) => state.users.entities);
  const { selectedUser } = useSelector((state) => state.creator.event);
  const {
    addEvent,
    getDataFromTitle,
    getDataFromText,
    cancelEventCreator,
    getDataFromTime,
    getDataFromDays,
    getDataFromHours,
    getDataFromUser,
  } = useActions();
  const event = useSelector((state) => state.creator.event);
  const handleCancel = () => {
    cancelEventCreator();
    closeEventCreater();
  };

  const createEvent = () => {
    addEvent();
    handleCancel();
  };

  const hoursList = Array.from({ length: 9 }, (v, k) => k + 1);
  const daysList = Array.from({ length: 7 }, (v, k) => k + 1);

  return (
    <div className={s.container}>
      <div className={s.options} data-name="options">
        <div className={s.options__topSection}>
          <div className={s.option__body}>
            <span>User</span>
            <EventOption
              onClick={(e) => getDataFromUser(e.target.textContent)}
              list={usersNames}
              defaultValue={selectedUser}
            />
          </div>
          <div>
            <span>Date</span>
            <Calendar />
          </div>
        </div>
        <div className={s.options__bottomSection}>
          <div className={s.option__body}>
            <span>Time</span>
            <EventOption
              list={time}
              defaultValue={`${event.time}:00`}
              onClick={(e) => getDataFromTime(e.target.textContent)}
            />
          </div>
          <div className={s.option__body}>
            <span>Days</span>
            <EventOption
              list={daysList}
              defaultValue={event.days}
              onClick={(e) => getDataFromDays(e.target.textContent)}
            />
          </div>
          <div className={s.option__body}>
            <span>Hours</span>
            <EventOption
              list={hoursList}
              defaultValue={event.hours}
              onClick={(e) => getDataFromHours(e.target.textContent)}
            />
          </div>
        </div>
      </div>

      <Input
        type="text"
        label="title"
        value={event.title}
        onChange={(e) => getDataFromTitle(e.target.value)}
      />
      <label htmlFor="text" className={s.textLabel}>
        TEXT:
      </label>
      <textarea
        name="text"
        id="text"
        className={s.text}
        value={event.text}
        onChange={(e) => getDataFromText(e.target.value)}
      ></textarea>
      <div className={s.btns}>
        <Button name="Cancel" onClick={handleCancel} />
        <Button name="Create event" onClick={() => createEvent()} />
      </div>
    </div>
  );
};
