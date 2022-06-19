import s from "./EventOuterView.module.scss";
import { CgCloseR } from "react-icons/cg";
import { removeEvent } from "../../features/events/events-slice";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
export const EventOuterView = ({ style, event }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={s.outer} style={style}>
        <span onClick={() => dispatch(removeEvent(event))}>
          <CgCloseR className={s.outer_iconRemove} />
        </span>

        <div className={s.outer_body}>
          <Link to={`/event/${event.id}`} className={s.link}></Link>
        </div>
      </div>
    </>
  );
};
