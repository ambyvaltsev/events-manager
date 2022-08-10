import s from "./EventInnerView.module.scss";
import { useGetEvent } from "../../hooks";
import { weekFull, months } from "../../../../utils/date_arrays";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/UI/button/Button";

export const EventInnerView = () => {
  const navigate = useNavigate();
  const event = useGetEvent();
  const date = `${weekFull[event.day - 1]}, ${event.date} ${months[event.month]}`;
  const goBack = () => navigate(-1);
  return (
    <div className={s.container}>
      <div className={s.btn}>
        <Button onClick={goBack} name="Back" style={{ fontSize: "14px" }} />
      </div>
      <div className={s.content}>
        <div className={s.title}>Date:</div>
        <p className={s.text}> {date}</p>
      </div>
      <div className={s.content}>
        <div className={s.title}>Title:</div>
        <p className={s.text}> {event.title}</p>
      </div>
      <div className={s.content}>
        <div className={s.title}>Text:</div>
        <p className={s.text}>{event.text}</p>
      </div>
    </div>
  );
};
