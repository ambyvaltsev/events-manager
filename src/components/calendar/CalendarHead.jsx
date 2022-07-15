import s from "./Calendar.module.scss";
import { weekFull } from "../../utils/date_arrays";
import { ImCalendar } from "react-icons/im";

export const CalendarHead = ({ date, day, month, onClick }) => {
  return (
    <div className={s.header}>
      <p className={s.date}>{`${weekFull[day - 1]}, ${date}.${
        month + 1 < 10 ? "0" + (month + 1) : month + 1
      }`}</p>
      <ImCalendar className={s.button} onClick={onClick} />
    </div>
  );
};
