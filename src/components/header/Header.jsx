import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../UI/button/Button";
import { logoutUser } from "../../features/auth/auth-slice";
import { removeState } from "../../store/localStorage";
import { useMatchMedia} from '../../hooks/useMatchMedia'

export const Header = () => {
  const {isMobile} = useMatchMedia()
  const dispatch = useDispatch();
  const logout = () => {
    removeState();
    dispatch(logoutUser())
      .unwrap()
      .then(() => removeState());
  };
  const { isAuth, login } = useSelector((state) => state.auth.entities);
  return (
    <header className={s.container}>
      <Link to="/" className={s.title}>
        Event manager
      </Link>
      <div className={s.date}>
        <span>
          {new Date().toLocaleString("en-US", {
            year: "numeric",
            month: isMobile ? "short" : "long",
            weekday: isMobile ? "short" : "long",
            day: "numeric",
          })}
        </span>
      </div>
      {isAuth ? (
        <div className={s.userArea}>
          <div className={s.user}>Привет, {login}</div>
          <Button name="LOG OUT" onClick={logout} />
        </div>
      ) : (
        <Link to="auth" className={s.auth}>
          LOG IN / SIGN UP
        </Link>
      )}
    </header>
  );
};
