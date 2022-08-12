import s from "./EventOption.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";

export const EventOption = ({ list, defaultValue, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const event = useSelector((state) => state.creator.event);
  const { user } = useSelector((state) => state.users.entities);

  useEffect(() => {
    setIsOpen(false);
  }, [event, user]);
  return (
    <div className={s.option}>
      <div className={s.display}>{defaultValue}</div>
      <VscTriangleDown className={`${s.btn} ${isOpen && s._active}`} onClick={() => setIsOpen(!isOpen)} />
      <div className={`${s.body} ${isOpen && s._active}`} onClick={onClick}>
        {list.map((item) => (
          <div key={item} className={s.item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
