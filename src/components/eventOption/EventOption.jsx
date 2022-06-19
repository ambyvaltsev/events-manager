import s from "./EventOption.module.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import { useScrollbar } from "../../hooks/useScrollbar";

export const EventOption = ({ byIndex, data, selectValue, optionValue }) => {
  const optionWrapper = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const event = useSelector((state) => state.creator.event);

  useScrollbar(optionWrapper);

  useEffect(() => {
    setIsOpen(false);
  }, [event.time, event.days, event.hours]);
  return (
    <div className={s.option}>
      <div className={s.display}>{selectValue}</div>
      <VscTriangleDown className={`${s.btn} ${isOpen && s._active}`} onClick={() => setIsOpen(!isOpen)} />
      <div className={`${s.body} ${isOpen && s._active}`}>
        <div
          ref={optionWrapper}
          style={{
            height: "120px",
          }}
          className={s.scrollWrapper}
        >
          {byIndex
            ? data.map((item, index) => (
                <div key={item} className={s.item} data-name={optionValue}>
                  {`${index + 1}`}
                </div>
              ))
            : data.map((item) => (
                <div key={item} className={s.item} data-name={optionValue}>
                  {item}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
