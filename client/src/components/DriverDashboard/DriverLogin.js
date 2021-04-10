import React, { useContext, useState } from "react";
import Base from "../../pages/Base";
import LoginPageImg from "../../img/health-solution.svg";
import { DriverContext } from "../../Contexts/DriverContext";
import { SocketContext } from "../../Contexts/SocketContext";
import { API } from "../../config/backend";
import { useHistory } from "react-router";
import { getCurrentLocation } from "../../config/location";
import { Link } from "react-router-dom";

const Login = () => {
  const [driver, setDriver] = useContext(DriverContext);
  const [socket, setsocket] = useContext(SocketContext);
  const [loading, setloading] = useState(false);
  const [formDetails, setformDetails] = useState({
    adhaar: "",
    password: "",
  });
  const [plateNo, setplateNo] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    fetch(`${API}/auth/driver/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const token = data.token;
          localStorage.setItem("jwt", token);
          history.push("/driver/dashboard");
        } else {
          console.log(data.error);
        }
      });
    // /**
    //  * TODO: After driver login
    //  * send the token to socket server
    //  * upon verification that it is indeed a driver
    //  * add him to on duty
    //  * ambulance
    //  */
    // const location = getCurrentLocation((position) => {
    //   return {
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     accuracy: position.coords.accuracy,
    //     speed: position.coords.speed,
    //   };
    // });
    // setDriver({
    //   details: driverAfterLogin,
    //   location: location,
    // });
    // console.log(driver);
    setloading(false);
    history.push("/driver/dashboard");
  };

  return (
    <div>
      <Base>
        <div className="row p-4">
          <div className="col-md-5 col-sm-10 offset-md-1 p-4 bg-dark rounded ">
            <h1 className="mb-4 text-white ">
              Hope,
              <br /> you are all fine
            </h1>
          </div>
          <form className="col-10 text-white" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="adhaar">aadhar card number</label>
              <input
                type="tel"
                className="form-control"
                value={formDetails.adhaar}
                pattern="^[0-9]{12}$"
                onChange={(e) =>
                  setformDetails({ ...formDetails, adhaar: e.target.value })
                }
                id="adhaar"
                aria-describedby="adhaarhelp"
                placeholder="Enter 12 digit adhaar no"
                required
                autoComplete="true"
                minLength="12"
                maxLength="12"
              />
              <small id="adhaarhelp" className="form-text text-muted">
                We'll never share your details with anyone else.
              </small>
            </div>
            <div className="form-group my-3">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                value={formDetails.password}
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) =>
                  setformDetails({ ...formDetails, password: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label for="exampleInputamb">Password</label>
              <input
                type="text"
                className="form-control"
                value={plateNo}
                id="exampleInputamb"
                placeholder="Plate Number"
                onChange={(e) => setplateNo(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {loading ? "logging you in...." : "login"}
            </button>
            <p className="text-center text-white mt-2">
              not having an account?register <Link to="/signup">here</Link>
            </p>
          </form>
          <div className="col-md col-sm-10 d-none d-md-flex justify-content-center align-items-center">
            <img src={LoginPageImg} alt="nice svg" />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Login;
