import s from "./Input.module.scss";

export const Input = ({label, required, reg, ...rest }) => {


  return (
    <div>
      <label className={s.label}>{label.toUpperCase()}:</label>
      <input {...reg} className={s.input} {...rest} />
    </div>
  );
};
