import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import {
  hasDocTokenInLocalStorage,
  setDocTokenInLocalStorage,
} from "../helper";
import Base from "./Base";
import DocLoginPageImg from "../img/doclogin.svg";
import { doclogin } from "../apiCalls/auth";
import DocLoginForm from "../components/login/DocLoginForm";

const DocLogin = (props) => {
  const [userDetails, setUserDetails] = useState({
    licId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //calling the login api
    doclogin(userDetails).then((res) => {
      console.log("DOC RESPONSE", res);
      //if login ok
      if (res.success) {
        setLoading(false);
        console.log(res);
        //set token in local storage
        setDocTokenInLocalStorage(res.token, () => {
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
  // this is when user tried to access a page from url
  //but is not logged in so redirected to login page
  //but this varible remember from which page user came
  //thus help in redirecting back to it
  const fromPage =
    (props &&
      props.location &&
      props.location.state &&
      props.location.state.from.pathname) ||
    "/doctor";
  return (
    <Base title="login|doctor">
      <div>
        {/* for redirecting :when login success or is already logged in from token */}

        {(redirect || hasDocTokenInLocalStorage()) && (
          <Redirect to={fromPage} />
        )}

        <div className="row p-4">
          {/* left part form*/}
          <div className="col-md-5 col-sm-10 offset-md-1 p-4 bg-dark rounded ">
            <h1 className="mb-4 text-white fw-bold display-5 h1">
              Ready to
              <br /> save the world
            </h1>
            {err && (
              <div class="alert alert-danger form-control" role="alert">
                license id or password did not matched
              </div>
            )}
            {/* rendering actual form */}
            <DocLoginForm
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>

          {/* right part image*/}
          <div className="col-md col-sm-10 d-none d-md-flex justify-content-center align-items-center">
            <img src={DocLoginPageImg} alt="nice svg" />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default DocLogin;
