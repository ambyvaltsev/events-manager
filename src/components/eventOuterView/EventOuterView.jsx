import s from "./EventOuterView.module.scss";
import { CgCloseR } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";

export const EventOuterView = ({ style, event }) => {
  const { login } = useSelector((state) => state.auth.entities);
  const { removeEvent } = useActions();

  return (
    <>
      <div className={s.outer} style={style}>
        {login === "admin" && (
          <span onClick={() => removeEvent(event)}>
            <CgCloseR className={s.outer_iconRemove} />
          </span>
        )}

        <div className={s.outer_body}>
          <Link to={`/event/${event.id}`} className={s.link}></Link>
        </div>
      </div>
    </>
  );
};
