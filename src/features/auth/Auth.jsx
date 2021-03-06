import s from "./Auth.module.scss";
import { useState } from "react";
import { Button } from "../../components/UI/button/Button";
import { SignUp } from "./signUp/SignUp";
import { LogIn } from "./logIn/LogIn";

export const Auth = () => {
  const [loginView, setLoginView] = useState(true);

  return (
    <div className={s.container}>
      <div className={s.body}>
        <div className={s.title}>
          <Button
            name="LOG IN"
            onClick={() => setLoginView(true)}
            style={{ border: "none" }}
          />
          <div className={s.line}>|</div>
          <Button
            name="SIGN UP"
            onClick={() => setLoginView(false)}
            style={{ border: "none" }}
          />
        </div>

        {loginView ? <LogIn /> : <SignUp />}
      </div>
    </div>
  );
};
