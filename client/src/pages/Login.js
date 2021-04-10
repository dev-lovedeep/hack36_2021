import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../components/login/LoginForm";
import {
  hasAuthTokenInLocalStorage,
  setAuthTokenInLocalStorage,
} from "../helper";
import Base from "./Base";
import LoginPageImg from "../img/login.svg";
import { login } from "../apiCalls/auth";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    adhaar: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //calling the login api
    login(userDetails).then((res) => {
      //if login ok
      if (res.success) {
        setLoading(false);
        //set token in local storage
        setAuthTokenInLocalStorage(res.token, () => {
          setRedirect(true);
        });
      }
      //if some error occured
      else {
        setErr(true);
        setLoading(false);
      }
    });
  };

  return <Base title="login">yo</Base>;
};

export default Login;
