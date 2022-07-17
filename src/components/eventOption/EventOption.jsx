import s from "./EventOption.module.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import { useSelectData } from "../../hooks/useSelectData";

export const EventOption = ({ list, defaultValue, optionDataset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const event = useSelector((state) => state.creator.event);
  const { guest } = useSelector((state) => state.events.entities);
  const [selectData] = useSelectData();

  useEffect(() => {
    setIsOpen(false);
  }, [event, guest]);
  return (
    <div className={s.option}>
      <div className={s.display}>{defaultValue}</div>
      <VscTriangleDown className={`${s.btn} ${isOpen && s._active}`} onClick={() => setIsOpen(!isOpen)} />
      <div className={`${s.body} ${isOpen && s._active}`} onClick={selectData}>
        {list.map((item) => (
          <div key={item} className={s.item} data-name={optionDataset}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
