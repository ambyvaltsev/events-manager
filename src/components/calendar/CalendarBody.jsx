import s from "./Calendar.module.scss";
import { months } from "../../assets/date_arrays";
import { Button } from "../UI/button/Button";
import { useSelector, useDispatch } from "react-redux";
import { nextMonth, prevMonth, cancelCalendar } from "../../features/eventCreator/eventCreater-slice";
import { BiRightArrowCircle, BiLeftArrowCircle } from "react-icons/bi";
import { MonthDaysArea } from "./MonthDaysArea";

export const CalendarBody = ({ isOpen, setIsOpen }) => {
  const event = useSelector((state) => state.creator.event);
  const dispatch = useDispatch();
  const handleNextMonth = () => {
    dispatch(nextMonth(1));
  };
  const handlePrevMonth = () => {
    dispatch(prevMonth(1));
  };
  const handleCancel = () => {
    dispatch(cancelCalendar());
    setIsOpen(false);
  };

  return (
    <div className={s.body}>
      <div className={s.year}>{event.year}</div>
      <div className={s.month}>
        <BiLeftArrowCircle onClick={handlePrevMonth} className={s.month__btn} />
        <div>{months[event.month]}</div>
        <BiRightArrowCircle onClick={handleNextMonth} className={s.month__btn} />
      </div>
      <MonthDaysArea isOpen={isOpen} />
      <div className={s.cancel}>
        <Button name="Cancel" onClick={handleCancel} fs="20px" />
      </div>
    </div>
  );
};
