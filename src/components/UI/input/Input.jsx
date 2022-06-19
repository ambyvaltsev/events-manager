import s from "./Input.module.scss";

export const Input = ({ label, register, required, ...rest }) => {
  let reg;
  if (label === "login") {
    reg = {
      ...register(label, {
        required: "Поле обязательно к заполнению",
        minLength: { value: 5, message: "Минимум 5 символов" },
        pattern: {
          value: /[A-Za-z]/,
          message: "Только латинцкие буквы",
        },
      }),
    };
  }
  if (label === "password") {
    reg = {
      ...register(label, {
        required: "Поле обязательно к заполнению",
        minLength: { value: 5, message: "Минимум 5 символов" },
        pattern: {
          value: /(?=.*[0-9])([A-Za-z])/,
          message: "Только латинцкие буквы и минимум одно число",
        },
      }),
    };
  }

  return (
    <div>
      <label className={s.label}>{label.toUpperCase()}:</label>
      <input {...reg} className={s.title} {...rest} />
    </div>
  );
};
