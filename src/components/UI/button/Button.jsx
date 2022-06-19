import s from "./Button.module.scss";

export const Button = ({ name, onClick, style, isValid, auth }) => {
    const loginIsValid = auth && !isValid
    return (
      <button className={s.button} onClick={onClick} style={style} disabled={loginIsValid}>
        {name}
      </button>
    );
};




