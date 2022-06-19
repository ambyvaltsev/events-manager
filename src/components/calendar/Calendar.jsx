import s from "./Calendar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectDate } from "../../features/eventCreator/eventCreater-slice";
import { CalendarHead } from "./CalendarHead";
import { CalendarBody } from "./CalendarBody";

export const Calendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const event = useSelector((state) => state.creator.event);

  const dispatch = useDispatch();
  const handleSelectDate = (e) => {
    if (e.target.dataset.name === "date-cell" && e.target.textContent) {
      dispatch(selectDate(+e.target.textContent));
      setIsOpen(false);
    }
  };

  const openCalendar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      document.querySelector('[data-name="date-cells"]').addEventListener("click", handleSelectDate);
    }
  }, [isOpen]);

  return (
    <div className={s.container}>
      <CalendarHead day={event.day} date={event.date} month={event.month} onClick={openCalendar} />
      {isOpen && <CalendarBody isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};
