import s from "./EventCreator.module.scss";
import { Calendar } from "../../components/calendar/Calendar";
import { Button } from "../../components/UI/button/Button";
import { time, weekFull } from "../../assets/date_arrays";
import { Input } from "../../components/UI/input/Input";
import { useEffect } from "react";
import { EventOption } from "../../components/eventOption/EventOption";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataFromDays,
  getDataFromTime,
  getDataFromTitle,
  getDataFromText,
  getDataFromHours,
  cancelEventCreator,
} from "./eventCreater-slice";
import { addEvent } from "../events/events-slice";

export const EventCreator = ({ closeEventCreater }) => {
  const event = useSelector((state) => state.creator.event);
  const dispatch = useDispatch();
  const getValue = (e) => {
    e.target.dataset.name === "option-time" && dispatch(getDataFromTime(+e.target.textContent.split(":")[0]));
    e.target.dataset.name === "option-days" && dispatch(getDataFromDays(+e.target.textContent));
    e.target.dataset.name === "option-hours" && dispatch(getDataFromHours(+e.target.textContent));
  };
  const handleCancel = () => {
    dispatch(cancelEventCreator());
    closeEventCreater();
  };
  const handleCreateEvent = () => {
    dispatch(addEvent());
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
        onChange={(e) => dispatch(getDataFromTitle(e.target.value))}
      />
      <label htmlFor="text" className={s.textLabel}>
        TEXT:
      </label>
      <textarea
        name=""
        id="text"
        className={s.text}
        value={event.text}
        onChange={(e) => dispatch(getDataFromText(e.target.value))}
      ></textarea>
      <div className={s.btns} onClick={handleCancel}>
        <Button name="Cancel" />
        <Button name="Create event" onClick={() => handleCreateEvent()} />
      </div>
    </div>
  );
};
