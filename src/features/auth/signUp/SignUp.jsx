import { useDispatch } from "react-redux";
import { createUser } from "../auth-slice";
import { AuthForm } from "../../../components/authForm/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigator = useNavigate();
  const [reg, setReg] = useState({ login: "", password: "" });
  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    dispatch(createUser(reg))
      .unwrap()
      .then((res) => {
        if (res) navigator("/");
      });

    setReg({ login: "", password: "" });
  };
  const handleCansel = (e) => {
    e.preventDefault();
    navigator("/");
  };
  return (
    <>
      <AuthForm auth={reg} setAuth={setReg} cansel={handleCansel} ok={handleSignUp} name="SIGN UP" />
    </>
  );
};
