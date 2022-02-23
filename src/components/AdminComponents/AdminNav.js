// import React from "react";
import { Link } from "react-router-dom";
import "../../AdminStyles.css";
import * as React from "react";

function AdminNav() {
  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <nav className="mobile-nav">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <Link to="/admin/add">
              <li>Add Animal</li>
            </Link>
            <Link to="/admin/edit">
              <li>Edit Animal</li>
            </Link>
            <Link to="/admin/forms">
              <li>Forms</li>
            </Link>
            <Link to="/admin/animalArchive">
              <li>Animal Archive</li>
            </Link>
            <Link to="/admin/formsArchive">
              <li>Form Archive</li>
            </Link>
            <Link to="/admin/info">
              <li>Instructions</li>
            </Link>
            <Link to="/admin/addUser">
              <li>Add User</li>
            </Link>
            <a onClick={() => logout()}>
              <li>Log Out</li>
            </a>
          </ul>
        </div>
      </nav>
      <header className="admin-nav-container">
        <div className="admin-nav-top">
          <div className="admin-nav-top-image"></div>
          <center>Admin Panel</center>
        </div>
        <ul>
          <li className="active-link">
            <Link to="/admin/add">&nbsp; Add Animal</Link>
          </li>
          <li>
            <Link to="/admin/edit">&nbsp; Edit Animal</Link>
          </li>
          <li>
            <Link to="/admin/forms">&nbsp; Forms</Link>
          </li>
          <li>
            <Link to="/admin/animalArchive">&nbsp; Animal Archive</Link>
          </li>
          <li>
            <Link to="/admin/formsArchive">&nbsp; Form Archive</Link>
          </li>
          <li>
            <Link to="/admin/info">&nbsp; Instructions</Link>
          </li>
          <li>
            <Link to="/admin/addUser">&nbsp; Add User</Link>
          </li>

          <li>
            <a onClick={() => logout()} href="">
              &nbsp; Log Out
            </a>
          </li>
        </ul>
      </header>
    </>
  );
}

export default AdminNav;
