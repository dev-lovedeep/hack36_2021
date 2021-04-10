import { API } from "../../config/backend";
export const login = (userCred) => {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //sending user credentials in body
    body: JSON.stringify(userCred),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const registerUser = (userDetails) => {
  return fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //sending user credentials in body
    body: JSON.stringify(userDetails),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// login api for doctors
export const doclogin = (userCred) => {
  return fetch(`${API}/auth/doc/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //sending user credentials in body
    body: JSON.stringify(userCred),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
