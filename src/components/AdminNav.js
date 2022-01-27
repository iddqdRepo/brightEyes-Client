import React from "react";

import "../AdminStyles.css";

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
            <a href="/admin/add">
              <li>Add Animal</li>
            </a>
            <a href="/admin/edit">
              <li>Edit Animal</li>
            </a>
            <a href="/admin/forms">
              <li>Forms</li>
            </a>
            <a href="/admin/animalArchive">
              <li>Animal Archive</li>
            </a>
            <a href="/admin/formsArchive">
              <li>Form Archive</li>
            </a>
            <a href="/admin/info">
              <li>Instructions</li>
            </a>
            <a href="/admin/addUser">
              <li>Add User</li>
            </a>
            <a onClick={() => logout()} href="">
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
          <li>
            <a href="/admin/add">&nbsp; Add Animal</a>
          </li>
          <li>
            <a href="/admin/edit">&nbsp; Edit Animal</a>
          </li>
          <li>
            <a href="/admin/forms">&nbsp; Forms</a>
          </li>
          <li>
            <a href="/admin/animalArchive">&nbsp; Animal Archive</a>
          </li>
          <li>
            <a href="/admin/formsArchive">&nbsp; Form Archive</a>
          </li>
          <li>
            <a href="/admin/info">&nbsp; Instructions</a>
          </li>
          <li>
            <a href="/admin/addUser">&nbsp; Add User</a>
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
