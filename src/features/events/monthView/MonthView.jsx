import s from "./MonthView.module.scss";
import { useDisplayDaysInMonth } from "../../../hooks/useDisplayDaysInMonth";
import { weekShort, weekFull, months } from "../../../utils/date_arrays";
import { useMatchMedia } from "../../../hooks/useMatchMedia";
import { useState, useEffect } from "react";
import { NextPrevBtns } from "../../../components/nextPrevBtns/NextPrevBtns";
import { useEventsSelectedMonth } from "./useEventsSelectedMonth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updTicker } from "../events-slice";

export const MonthView = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { isMobile } = useMatchMedia();
  const [date, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const daysInMonth = useDisplayDaysInMonth(date.month);
  const dataSelectedMonth = useEventsSelectedMonth(date);

  const handleNextMonth = () => {
    if (date.month === 11) {
      setDate({ month: 0, year: date.year + 1 });
    } else {
      setDate({ ...date, month: date.month + 1 });
    }
  };

  const handlePrevMonth = () => {
    if (date.month === 0) {
      setDate({ month: 11, year: date.year - 1 });
    } else {
      setDate({ ...date, month: date.month - 1 });
    }
  };

  const handleOpenWeek = (e) => {
    let ticker = "";
    //подумать над реализацией (без изменения step)
    const target = e.target.textContent;
    if (dataSelectedMonth.dates.includes(+target) && dataSelectedMonth.tickers) {
      ticker = dataSelectedMonth.tickers.find((ticker) => ticker.split("-")[2] === target);
      dispatch(updTicker(ticker));
      navigator("/");
    }
  };

  useEffect(() => {
    document.querySelector("[data-name]").addEventListener("click", handleOpenWeek);
  }, [dataSelectedMonth]);

  return (
    <div className={s.container}>
      <NextPrevBtns
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

      <div className={s.monthDates} data-name="date-cells">
        {daysInMonth.cells.map((cell, index) => {
          return (
            <div
              key={index}
              className={
                dataSelectedMonth.dates.includes(cell) ? `${s.monthDate} ${s._active}` : `${s.monthDate}`
              }
              data-name={cell && "date-cell"}
            >
              {cell}
            </div>
          );
        })}
      </div>
    </div>
  );
};
