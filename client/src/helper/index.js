//set auth token in local storage
export const setAuthTokenInLocalStorage = (token, cb) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("jwt", token);
    cb();
  }
};

//check auth token in local storage
export const hasAuthTokenInLocalStorage = () => {
  if (typeof window !== undefined) {
    if (window.localStorage.getItem("jwt")) return localStorage.getItem("jwt");
    else return false;
  }
  return false;
};

//set auth token for doctor account in local storage
export const setDocTokenInLocalStorage = (token, cb) => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("docjwt", token);
    cb();
  }
};

//check doctor auth token in local storage
export const hasDocTokenInLocalStorage = () => {
  if (typeof window !== undefined) {
    if (window.localStorage.getItem("docjwt"))
      return localStorage.getItem("docjwt");
    else return false;
  }
  return false;
};
