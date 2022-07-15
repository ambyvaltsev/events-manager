import s from "./EventCreator.module.scss";
import { Calendar } from "../../components/calendar/Calendar";
import { Button } from "../../components/UI/button/Button";
import { time, weekFull } from "../../utils/date_arrays";
import { Input } from "../../components/UI/input/Input";
import { useEffect } from "react";
import { EventOption } from "../../components/eventOption/EventOption";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";

export const EventCreator = ({ closeEventCreater }) => {
  const {
    addEvent,
    getDataFromDays,
    getDataFromTime,
    getDataFromTitle,
    getDataFromText,
    getDataFromHours,
    cancelEventCreator,
  } = useActions();
  const event = useSelector((state) => state.creator.event);

  const getValue = (e) => {
    e.target.dataset.name === "option-time" && getDataFromTime(+e.target.textContent.split(":")[0]);
    e.target.dataset.name === "option-days" && getDataFromDays(+e.target.textContent);
    e.target.dataset.name === "option-hours" && getDataFromHours(+e.target.textContent);
  };
  const handleCancel = () => {
    cancelEventCreator();
    closeEventCreater();
  };
  const handleCreateEvent = () => {
    addEvent();
  };

  useEffect(() => {
    document.querySelector('[data-name="options"]').addEventListener("click", getValue);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.options} data-name="options">
        <div>
          <span>Date</span>
          <Calendar />
        </div>
        <div className={s.options__selectors}>
          <div className={s.option__body}>
            <span>Time</span>
            <EventOption data={time} selectValue={`${event.time}:00`} optionValue="option-time" />
          </div>
          <div className={s.option__body}>
            <span>Days</span>
            <EventOption data={weekFull} selectValue={event.days} byIndex optionValue="option-days" />
          </div>
          <div className={s.option__body}>
            <span>Hours</span>
            <EventOption data={time} selectValue={event.hours} byIndex optionValue="option-hours" />
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
      <div className={s.btns} onClick={handleCancel}>
        <Button name="Cancel" />
        <Button name="Create event" onClick={() => handleCreateEvent()} />
      </div>
    </div>
  );
};
