import { useSelector } from "react-redux";

import { useState, useEffect } from "react";

const getDaysInCurrentMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getCalendarDays = (date, monthDays, selectedMonth) => {
  let currentDay = null;
  const monthDate = new Date(date.year, selectedMonth, 1);
  const firstDay = monthDate.getDay() === 0 ? 6 : monthDate.getDay() - 1;
  const cells = Array.from({ length: monthDays + firstDay }, (_, index) => {
    return index + 1 > firstDay ? index + 1 - firstDay : "";
  });
  if (date.year === new Date().getFullYear() && selectedMonth === new Date().getMonth()) {
    currentDay = new Date().getDate() + firstDay - 1;
  }
  return { cells: cells, day: currentDay };
};

export const useDisplayDaysInMonth = (selectedMonth) => {
  const [daysInMonth, setDaysInMonth] = useState({ cells: [], day: 1 });
  const [month, setMonth] = useState(0);
  const event = useSelector((state) => state.creator.event);

  useEffect(() => {
    setDaysInMonth(getCalendarDays(event, month, selectedMonth));
  }, [event.year, month, selectedMonth]);

  useEffect(() => {
    setMonth(getDaysInCurrentMonth(event.year, selectedMonth));
  }, [selectedMonth]);

  return daysInMonth;
};
