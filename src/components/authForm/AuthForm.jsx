import s from "./AuthForm.module.scss";
import { Input } from "../UI/input/Input";
import { Button } from "../UI/button/Button";
import { useForm } from "react-hook-form";

export const AuthForm = (props) => {
  const { auth, setAuth, cansel, ok, name } = props;
  const { register, handleSubmit, formState: {errors, isValid} } = useForm({
    mode: "onBlur",
  });

  return (
    <form action="#" name="auth" onSubmit={handleSubmit(ok)} className={s.form}>
      <div>
        <Input
          register={register}
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
          register={register}
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
        <Button name={name} isValid={isValid} auth />
        <Button name="CANSEL" onClick={cansel} />
      </div>
    </form>
  );
};
