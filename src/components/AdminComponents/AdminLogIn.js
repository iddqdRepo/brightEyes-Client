import React, { useState } from "react";
import * as api from "../../api/apiIndex";
import { Helmet } from "react-helmet-async";

function AdminLogIn() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warningText, setWarningText] = useState("");
  let b = "";
  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUser(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const logIn = async (e) => {
    e.preventDefault();

    let userInfo = { username: username.trim().toLowerCase(), password: password.trim().toLowerCase() };
    // let userInfo = { username: "chris", password: "password" };

    const data = await api.logUserIn(userInfo);
    console.log(data.data.message);
    if (data.data.message === "Success") {
      localStorage.setItem("token", data.data.token);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      setWarningText("Invalid credentials");
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <form onSubmit={(e) => logIn(e)}>
        <div className="login-page-container">
          <div className="login-page-content-container">
            <div className="login-image-container">
              <div className="login-page-top-image"></div>
            </div>
            <div className="add-animal-content">
              <div className="add-animal-title">Username:</div>
              <input
                className="animal-form-box"
                autoComplete="off"
                type="text"
                id="username"
                name="username"
                value={username}
                onInput={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="add-animal-content">
              <div className="add-animal-title">Password:</div>
              <input
                className="animal-form-box"
                autoComplete="off"
                type="password"
                id="password"
                name="password"
                value={password}
                onInput={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="admin-warning">{warningText}</div>

            <div className="login-button-container">
              <button type="submit" className="button login-button">
                Log In
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AdminLogIn;
