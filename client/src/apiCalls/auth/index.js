import { API } from "../../config/backend";
import {
  hasAuthTokenInLocalStorage,
  hasDocTokenInLocalStorage,
} from "../../helper";
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

//add patient to doctor's patient list

export const addPatient = (userDetails) => {
  const doctoken = hasAuthTokenInLocalStorage() && hasDocTokenInLocalStorage();

  return fetch(`${API}/doc/patients`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${doctoken}`,
    },
    //sending user credentials in body
    body: JSON.stringify({ patient: userDetails }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
