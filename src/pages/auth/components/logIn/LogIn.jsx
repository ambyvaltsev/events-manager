import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../features/auth/auth-slice";
import { AuthForm } from "../authForm/AuthForm";

export const LogIn = () => {
  const navigator = useNavigate();
  const [login, setLogin] = useState({ login: "", password: "" });
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginUser(login))
      .unwrap()
      .then((res) => {
        if (res) navigator("/");
      });
  };
  const handleCansel = () => {
    navigator("/");
  };
  return (
    <AuthForm
      auth={login}
      setAuth={setLogin}
      cansel={handleCansel}
      ok={handleLogin}
      name="LOG IN"
    />
  );
};
