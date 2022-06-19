import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useEventsSelectedMonth = (date) => {
  const [dataSelectedMonth, setDataSelectedMonth] = useState({dates: [], events: []});
  const events = useSelector((state) => state.events.entities.events);

  useEffect(() => {
    if (events) {
      let eventsSelectedMonth = events.filter(
          (event) => event.month === date.month && event.year === date.year
      )
      let datesSelectedMonth = eventsSelectedMonth.reduce((acc, cur) => {
          if (cur.days > 1) {
            for (let i = 0; i < cur.days; i++) {
              acc = [...acc, cur.date + i]
            }
            return acc;
          } else {
            return [...acc, cur.date];
          }
      }, []);

      
      //переделать
      let ticker =  eventsSelectedMonth.reduce((acc, cur) => {
          if (cur.days > 1) {
            for (let i = 0; i < cur.days; i++) {
              acc = [...acc, `${cur.year}-${cur.month}-${cur.date+i}`]
            }
            return acc;
          } else {
            return [...acc, `${cur.year}-${cur.month}-${cur.date}`];
          }
      }, []);
      const data = {dates: datesSelectedMonth, tickers: ticker }
      setDataSelectedMonth(data);
    }
  }, [events, date]);

  return dataSelectedMonth;
};
