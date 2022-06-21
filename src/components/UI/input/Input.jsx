import s from "./Input.module.scss";

export const Input = ({ label, register, required, ...rest }) => {
  let reg;
  if (label === "login") {
    reg = {
      ...register(label, {
        required: "The field is required",
        minLength: { value: 5, message: "Минимум 5 символов" },
        pattern: {
          value: /[A-Za-z]/,
          message: "Only latin letters",
        },
      }),
    };
  }
  if (label === "password") {
    reg = {
      ...register(label, {
        required: "The field is required",
        minLength: { value: 5, message: "Минимум 5 символов" },
        pattern: {
          value: /(?=.*[0-9])([A-Za-z])/,
          message: "Only latin letters and at least one number",
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
