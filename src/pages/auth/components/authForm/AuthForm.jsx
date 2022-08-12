import s from "./AuthForm.module.scss";
import { Input } from "../../../../components/UI/input/Input";
import { Button } from "../../../../components/UI/button/Button";
import { useForm } from "react-hook-form";

export const AuthForm = (props) => {
  const { auth, setAuth, cansel, ok, name } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form action="#" name="auth" onSubmit={handleSubmit(ok)} className={s.form}>
      <div>
        <Input
          reg={{
            ...register("login", {
              required: "The field is required",
              minLength: { value: 5, message: "Min 5 characters" },
              pattern: {
                value: /[A-Za-z]/,
                message: "Only latin letters",
              },
            }),
          }}
          label="login"
          type="text"
          placeholder="LOGIN"
          style={{ fontSize: "16px" }}
          value={auth.login}
          onChange={(e) => setAuth({ ...auth, login: e.target.value })}
        />
        <div className={s.error}>{errors?.login && <p>{errors?.login?.message || "Error!"}</p>}</div>
      </div>
      <div>
        <Input
          reg={{
            ...register("password", {
              required: "The field is required",
              minLength: { value: 5, message: "Min 5 characters" },
              pattern: {
                value: /((?=.*[0-9])([A-Za-z]))/,
                message: "Only latin letters and at least one number",
              },
            }),
          }}
          label="password"
          type="password"
          placeholder="PASSWORD"
          style={{ fontSize: "16px" }}
          value={auth.password}
          onChange={(e) => setAuth({ ...auth, password: e.target.value })}
        />
        <div className={s.error}>{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}</div>
      </div>
      <div className={s.btns}>
        <Button name={name} />
        <Button name="CANSEL" onClick={cansel} />
      </div>
    </form>
  );
};
