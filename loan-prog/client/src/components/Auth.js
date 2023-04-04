import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [loggingIn, setLoggingIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);
  const [error, setError] = useState(null);

  //console.log(email, password, confPassword);
  console.log(cookies);

  const viewLogIn = (status) => {
    setError(null);
    setLoggingIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!loggingIn && password !== confPassword) {
      setError("passwords do not match");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    //console.log(data);

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{loggingIn ? "sign in" : "sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loggingIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="header-btn"
            onClick={(e) => handleSubmit(e, loggingIn ? "signin" : "signup")}
          />
          {error && <p className="err">{error}</p>}
        </form>
        <div className="auth-options">
          <div
            className="signup"
            style={{ display: loggingIn ? "block" : "none" }}
          >
            <p>
              New Here?
              <span>
                <button onClick={() => viewLogIn(false)}>Sign Up</button>
              </span>
            </p>
          </div>
          <div
            className="signin"
            style={{ display: loggingIn ? "none" : "block" }}
          >
            <p>
              Already have an account?
              <span>
                <button onClick={() => viewLogIn(true)}>Sign In</button>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
