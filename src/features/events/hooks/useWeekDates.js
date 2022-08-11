import { useState, useEffect } from "react";
import { weekFull } from "../../../utils/date_arrays";
import { useDispatch } from "react-redux";

const getWeekDates = (step = 0) => {
  let indexCurrentDayWeek = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return weekFull.map((day, index) => {
    let date = new Date();
    date.setDate(new Date().getDate() - indexCurrentDayWeek + index + step);
    let month = date.getMonth();
    let year = date.getFullYear();
    date = date.getDate();
    return { weekDay: day, date: date, month: month, year: year };
  });
};

export const useWeekDates = (ticker) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [weekDates, setWeekDates] = useState(getWeekDates());

  const update = (nextStep) => {
    setStep(step + nextStep);
  };
  useEffect(() => {
    setWeekDates(getWeekDates(step));
  }, [step]);


  
  return { weekDates, update, step };
};


