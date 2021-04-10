import React from "react";

const DocLoginForm = ({
  userDetails,
  setUserDetails,
  handleSubmit,
  loading,
}) => {
  const { licId, password } = userDetails;
  return (
    <form className="col-10 text-white" onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="license">license id</label>
        {/* license id */}
        <input
          type="tel"
          className="form-control"
          value={licId}
          onChange={(e) =>
            setUserDetails({ ...userDetails, licId: e.target.value })
          }
          id="license"
          aria-describedby="licensehelp"
          placeholder="Enter licenseid"
          required
          autoComplete="true"
        />
      </div>
      {/* password */}
      <div className="form-group my-3">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          id="exampleInputPassword1"
          placeholder="Password"
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
        />
      </div>
      {/*TODO:create session storage for this
         <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            remember me
          </label>
        </div> */}
      <button type="submit" className="btn btn-primary w-100">
        {loading ? "logging you in...." : "login"}
      </button>
    </form>
  );
};

export default DocLoginForm;
