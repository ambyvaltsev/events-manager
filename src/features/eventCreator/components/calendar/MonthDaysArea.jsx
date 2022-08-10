import s from "./Calendar.module.scss";
import { useSelector } from "react-redux";
import { weekShort } from "../../../../utils/date_arrays";
import { useDisplayDaysInMonth } from "../../../events/hooks/useDisplayDaysInMonth";

export const MonthDaysArea = () => {
  const selectedMonth = useSelector((state) => state.creator.event.month);
  const daysInMonth = useDisplayDaysInMonth(selectedMonth);

  return (
    <div className={s.dates}>
      <div className={s.weekNames}>
        {weekShort.map((day) => (
          <div className={s.weekName} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={s.monthDates} data-name="date-cells">
        {daysInMonth &&
          daysInMonth.cells.map((cell, index) => (
            <div
              key={index}
              className={`${s.monthDate} ${daysInMonth.day === index && s._active}`}
              data-name={cell && "date-cell"}
            >
              {cell}
            </div>
          ))}
      </div>
    </div>
  );
};
