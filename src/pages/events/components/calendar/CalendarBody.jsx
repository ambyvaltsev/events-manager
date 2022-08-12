import s from "./Calendar.module.scss";
import { months } from "../../../../utils/date_arrays";
import { Button } from "../../../../components/UI/button/Button";
import { useSelector } from "react-redux";
import { BiRightArrowCircle, BiLeftArrowCircle } from "react-icons/bi";
import { MonthDaysArea } from "./MonthDaysArea";
import { useActions } from "../../../../hooks/useActions";

export const CalendarBody = ({ isOpen, setIsOpen }) => {
  const { nextMonth, prevMonth, cancelCalendar } = useActions();
  const event = useSelector((state) => state.creator.event);

  const handleNextMonth = () => {
    nextMonth(1);
  };
  const handlePrevMonth = () => {
    prevMonth(1);
  };
  const handleCancel = () => {
    cancelCalendar();
    setIsOpen(false);
  };

  return (
    <div className={s.body}>
      <div className={s.year}>{event.year}</div>
      <div className={s.month}>
        <BiLeftArrowCircle onClick={handlePrevMonth} className={s.month__btn} />
        <div className={s.month__name}>{months[event.month]}</div>
        <BiRightArrowCircle onClick={handleNextMonth} className={s.month__btn} />
      </div>
      <MonthDaysArea isOpen={isOpen} />
      <div className={s.cancel}>
        <Button name="Cancel" onClick={handleCancel} fs="20px" />
      </div>
    </div>
  );
};
