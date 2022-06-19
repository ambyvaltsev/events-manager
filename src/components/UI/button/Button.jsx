import s from "./Button.module.scss";

export const Button = ({ name, onClick, style }) => {

    return (
      <button className={s.button} onClick={onClick} style={style}>
        {name}
      </button>
    );
};




