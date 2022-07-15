import s from "./NextPrevBtns.module.scss";
import { CgChevronLeftO, CgChevronRightO } from "react-icons/cg";
import { months } from "../../utils/date_arrays";

export const NextPrevBtns = (props) => {
  const { update, date, value, isWeek, isMonth, handlePrev, handleNext } = props;

  return (
    <div className={s.bar}>
      <div className={s.btns}>
        <CgChevronLeftO className={s.btn} onClick={isWeek ? () => update(-value) : handlePrev} />

        {isWeek && (
          <div className={s.range}>{`${months[date[0].month]}, ${date[0].date} - ${months[date[6].month]}, ${
            date[6].date
          }`}</div>
        )}

        {isMonth && <div className={s.range}>{date}</div>}

        <CgChevronRightO className={s.btn} onClick={isWeek ? () => update(value) : handleNext} />
      </div>
    </div>
  );
};
