import React from "react";

import "../styles.css";
import "../reset.css";

function Nav() {
  return (
    <>
      <nav className="mobile-nav">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <a href="/">
              <li>Home</li>
            </a>
            <a href="/about">
              <li>About Us</li>
            </a>
            <a href="/adoption">
              <li>Adoption</li>
            </a>
            <a href="/donate">
              <li>Donate</li>
            </a>
            <a href="/forms/volunteer">
              <li>Volunteer</li>
            </a>
            <a href="/forms">
              <li>Forms</li>
            </a>
          </ul>
        </div>
      </nav>
      <nav className="nav">
        <div className="nav-logo"></div>
        <div className="social-links-container">
          <div className="social">
            <span className="iconify" data-icon="akar-icons:facebook-fill" data-width="20" data-height="20"></span>
            <span className="iconify" data-icon="akar-icons:instagram-fill" data-width="20" data-height="20"></span>
          </div>
          <ul className="nav__list">
            <li>
              <a className="nav__item" href="/">
                Home
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__item" href="/about">
                About Us
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__item" href="/adoption">
                Adoption
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__item" href="/donate">
                Donate
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__item" href="/forms/volunteer">
                Volunteer
              </a>
            </li>
            <li className="nav__item">
              <a className="nav__item" href="/forms">
                Forms
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
