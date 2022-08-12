import s from "./MonthEvents.module.scss";
import { useDisplayDaysInMonth, useEventsSelectedMonth } from "./hooks"
import { useMatchMedia } from "../../hooks";
import { weekShort, weekFull, months } from "../../utils/date_arrays";
import { useState, useEffect, useRef } from "react";
import { Navigator } from "../../components/navigator/Navigator";
import { useNavigate } from "react-router-dom";

export const MonthEvents = () => {
  const cellsRef = useRef(null);
  const navigate = useNavigate();
  const { isMobile } = useMatchMedia();
  const [date, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const daysInMonth = useDisplayDaysInMonth(date.month);
  const dataSelectedMonth = useEventsSelectedMonth(date);

  const handleNextMonth = () => {
    date.month === 11
      ? setDate({ month: 0, year: date.year + 1 })
      : setDate({ ...date, month: date.month + 1 });
  };

  const handlePrevMonth = () => {
    date.month === 0
      ? setDate({ month: 11, year: date.year - 1 })
      : setDate({ ...date, month: date.month - 1 });
  };
  const handleOpenWeek = (e) => {
    const target = e.target.textContent;
    if (dataSelectedMonth.some((data) => data.day === +target)) {
      let id = dataSelectedMonth.find((data) => data.day === +target).id;
      navigate(`/event/${id}`);
    }
  };

  useEffect(() => {
    const instance = cellsRef.current;
    instance.addEventListener("click", handleOpenWeek);
    return () => instance.removeEventListener("click", handleOpenWeek);
  }, [dataSelectedMonth]);

  return (
    <div className={s.container}>
      <Navigator
        isMonth
        value={1}
        date={months[date.month]}
        handlePrev={handlePrevMonth}
        handleNext={handleNextMonth}
      />
      <div className={s.weekNames}>
        {isMobile
          ? weekShort.map((day) => (
              <div className={s.weekName} key={day}>
                {day}
              </div>
            ))
          : weekFull.map((day) => (
              <div className={s.weekName} key={day}>
                {day}
              </div>
            ))}
      </div>

      <div className={s.monthDates} ref={cellsRef}>
        {daysInMonth.cells.map((cell, index) => {
          return (
            <div
              key={index}
              className={
                dataSelectedMonth.some((data) => data.day === cell)
                  ? `${s.monthDate} ${s._active}`
                  : `${s.monthDate}`
              }
              data-name='date-cell'
            >
              {cell}
            </div>
          );
        })}
      </div>
    </div>
  );
};
