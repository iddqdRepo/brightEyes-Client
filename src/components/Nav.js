import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "../styles.css";
import "../reset.css";

function Nav() {
  const navLinks = [
    { Home: "/" },
    { "About Us": "/about" },
    { Adoption: "/adoption" },
    { Donate: "/donate" },
    { Volunteer: "/forms/volunteer" },
    { Forms: "/forms" },
  ];
  const refs = useRef([]);
  const hideNavRef = useRef();

  const activeToggle = (ref, text) => {
    //^ loop through each nav item, if it's the clicked link, set the classname to active-link
    //^ remove active-link from all others so they don't stay highlighted

    refs.current.forEach((element) => {
      if (element.innerText !== text) {
        element.className = "nav__item";
      } else {
        element.className = "nav__item active-link";
      }
    });
  };

  const hideMobileNavOnLinkClick = () => {
    hideNavRef.current.checked = false;
  };
  return (
    <>
      <nav className="mobile-nav">
        <div id="menuToggle">
          <input ref={hideNavRef} type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <Link to="/">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick();
                }}
              >
                Home
              </li>
            </Link>
            <Link to="/about">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick();
                }}
              >
                About Us
              </li>
            </Link>
            <Link to="/adoption">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick();
                }}
              >
                Adoption
              </li>
            </Link>
            <Link to="/donate">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick();
                }}
              >
                Donate
              </li>
            </Link>
            <Link to="/forms/volunteer">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick();
                }}
              >
                Volunteer
              </li>
            </Link>
            <Link to="/forms">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick();
                }}
              >
                Forms
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      <nav className="nav">
        <div className="nav-logo"></div>
        <div className="social-links-container">
          <div className="social">
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/brighteyes.a.s/">
              <span className="iconify" data-icon="akar-icons:facebook-fill" data-width="20" data-height="20"></span>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/brighteyesanimalsanctuary">
              <span className="iconify" data-icon="akar-icons:instagram-fill" data-width="20" data-height="20"></span>
            </a>
          </div>
          <ul className="nav__list">
            {navLinks.map((el, index) => {
              //^ map thought and create nav links from the navLinks object
              //^ Create a specific useRef for each element in the map and store it in refs
              return (
                <li key={Object.keys(el)[0]}>
                  <Link
                    data-testid={`nav${Object.keys(el)[0]}`}
                    to={el[Object.keys(el)[0]]}
                    className="nav__item"
                    ref={(element) => {
                      refs.current[index] = element;
                    }}
                    onClick={() => {
                      activeToggle(refs.current[index], Object.keys(el)[0]);
                    }}
                  >
                    {Object.keys(el)[0]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
