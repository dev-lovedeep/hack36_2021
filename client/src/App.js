import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import DriverDashboard from "./components/DriverDashboard";
import DriverLogin from "./components/DriverDashboard/DriverLogin";
import UserDashboard from "./components/UserDashboard";
import { DriverProvider } from "./Contexts/DriverContext";
import { UserProvider } from "./Contexts/UserContext";
import SignUp from "./pages/SignUp";
import AdminComp from "./AdminComp";
import PageNotFound from "./pages/PageNotFound";
import DocHome from "./pages/DocHome";
import DocDash from "./pages/DocDash";
import PrivateRoute from "./helper/PrivateRoute";
import DocLogin from "./pages/DocLogin";
import DocRoute from "./helper/DocRoute";
import { SocketContext, SocketProvider } from "./Contexts/SocketContext";
import { useContext, useEffect } from "react";
import socketioclient from "socket.io-client";
import { API } from "./config/backend";

function App() {
  const [socket, setsocket] = useContext(SocketContext);
  useEffect(() => {
    if (socket === undefined) {
      const s = socketioclient(API);
      setsocket(s);
    }
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/admin">
          <AdminComp />
        </Route>
        <Route path="/user">
          <UserProvider>
            <Switch>
              <Route exact path="/user/login">
                <Login />
              </Route>
              <Route exact path="/user/signup">
                <SignUp />
              </Route>
              <PrivateRoute exact path="/user/dashboard">
                <UserDashboard />
              </PrivateRoute>
            </Switch>
          </UserProvider>
        </Route>
        <Route path="/driver">
          <DriverProvider>
            <Switch>
              <Route exact path="/driver/login">
                <DriverLogin />
              </Route>
              <Route exact path="/driver/dashboard">
                <DriverDashboard />
              </Route>
            </Switch>
          </DriverProvider>
        </Route>
        <Route path="/doctor">
          <Switch>
            <DocRoute exact path="/doctor/login">
              <DocLogin />
            </DocRoute>
            <DocRoute exact path="/doctor">
              <DocHome />
            </DocRoute>
            <DocRoute exact path="/doctor/dashboard">
              <DocDash />
            </DocRoute>
          </Switch>
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
