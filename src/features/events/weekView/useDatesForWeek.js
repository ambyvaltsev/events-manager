import { useState, useEffect } from "react";
import { weekFull } from "../../../assets/date_arrays";
import { useDispatch } from "react-redux";
import { updTicker } from "../events-slice";

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

  //переделать
  useEffect(() => {
    if (ticker) {
      setStep(step + mathStep(ticker));
      dispatch(updTicker(""));
    }
  }, []);
  return { weekDates, update, step };
};

//переделать
function mathStep(ticker) {
  if (ticker) {
    const date = ticker.split("-")[2];
    const month = ticker.split("-")[1];
    const year = ticker.split("-")[0];
    let index = new Date(year, month, date).getDay() === 0 ? 6 : new Date(year, month, date).getDay() - 1;
    return Math.ceil(((new Date(year, month, date) - new Date()) / 1000 / 3600 / 24 - index) / 7) * 7;
  }
}
