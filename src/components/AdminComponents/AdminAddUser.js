import React, { useState } from "react";
import * as api from "../../api/apiIndex";
import { Helmet } from "react-helmet-async";

function AdminAddUser() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warningText, setWarningText] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUser(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    let userInfo = { username, password };
    if (password !== confirmPassword) {
      setWarningText("Passwords do not match");
    } else if (password === "") {
      setWarningText("Enter Password");
    } else {
      const data = await api.addUser(userInfo);
      console.log(data.data.message);
      if (data.data.message === "User Added") {
        setWarningText("User Added");
        setPassword("");
        setUser("");
        setConfirmPassword("");
      } else if (data.data.message === "Username has already been taken") {
        setWarningText("Username already taken");
      } else {
        setWarningText("Please Enter Details");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Admin add a new user, Bright Eyes." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="/admin/addUser" />
      </Helmet>
      <form onSubmit={(e) => addUser(e)}>
        <div className="login-page-container">
          <div className="login-page-content-container">
            <div className="admin-add-user-warning">ADD NEW USER</div>

            <div className="admin-add-user-warning">{warningText}</div>
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
                  handleChange(e); //copy person from the state, then get name from object and change it
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
                  handleChange(e); //copy person from the state, then get name from object and change it
                }}
              />
            </div>
            <div className="add-animal-content">
              <div className="add-animal-title">Confirm Password:</div>
              <input
                className="animal-form-box"
                autoComplete="off"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onInput={(e) => {
                  handleChange(e); //copy person from the state, then get name from object and change it
                }}
              />
            </div>

            <div className="login-button-container">
              <button type="submit" className="button login-button">
                Add User
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AdminAddUser;
