import React, { useEffect, useState } from "react";
import { getUserById } from "../../apiCalls/auth";
import DashComp from "../UserDashboard/DashComp";

const ShowDetail = (userId) => {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("CHANGE DETECTED");
    getUserById(userId)
      .then((res) => {
        if (res.success) {
          setUser(res.user);
          setSuccess(true);
        } else console.log(console.error);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  return (
    <>{success ? <DashComp user={user} /> : <p>some problem occured</p>}</>
  );
};

export default ShowDetail;
