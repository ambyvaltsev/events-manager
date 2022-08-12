import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useEventsSelectedMonth = (date) => {
  const [dataSelectedMonth, setDataSelectedMonth] = useState([]);
  const events = useSelector((state) => state.events.entities.events);

  useEffect(() => {
    if (events) {
      let eventsSelectedMonth = events.filter(
        (event) => event.month === date.month && event.year === date.year
      );
      let datesSelectedMonth = eventsSelectedMonth.reduce((acc, cur) => {
        if (cur.days > 1) {
          for (let i = 0; i < cur.days; i++) {
            acc = [...acc, {day: cur.date + i, id: `${cur.date}.${cur.month}.${cur.year}`}];
          }
          return acc;
        } else {
          return [...acc, {day: cur.date, id: `${cur.date}.${cur.month}.${cur.year}`}];
        }
      }, []);

      setDataSelectedMonth([...datesSelectedMonth]);
    }
  }, [events, date]);
  return dataSelectedMonth;
};
