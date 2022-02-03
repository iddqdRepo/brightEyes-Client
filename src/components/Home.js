import React, { useState } from "react";
import Map from "./Map";
import { Link } from "react-router-dom";
import * as api from "../api/apiIndex";

function Home() {
  const [senderEmail, setSenderEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const type = "message";
  const [messageSentAlert, setMessageSentAlert] = useState("");
  const [errorAlertText, setErrorAlertText] = useState("");
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const updateForm = (e) => {
    console.log(e.target.name);
    if (e.target.name === "email") {
      setSenderEmail(e.target.value);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "message") {
      setMessage(e.target.value);
    }
  };

  const sendFormEmail = async (e) => {
    e.preventDefault();
    const data = {
      name,
      senderEmail,
      message,
      type,
    };
    if (data.name === "" || data.senderEmail === "" || data.message === "") {
      setErrorAlertText("Please fill in all fields");
    } else {
      if (!data.senderEmail.match(regex)) {
        setErrorAlertText("Please enter a valid email address");
      } else {
        setMessageSentAlert("loading");
        const messageSentRes = await api.sendMail(data);
        setMessageSentAlert(messageSentRes.data.message);
      }
    }
  };

  return (
    <>
      <div className="hero-image"></div>

      <div className="about-us-container">
        <div className="about-header">About Us</div>

        <div className="about-us-split-content">
          <div className="about-us-split-text">
            <div className="about-us-split-text-title">Bright Eyes Animal Sanctuary</div>

            <div className="about-us-split-text-description">
              Bright Eyes was established in 1989 and is based in <span className="slanted-about-us-bold-desc">Co.Fermanagh, Northern Ireland </span>.
              <br />
              We operate a strict <span className="slanted-about-us-bold-desc">no kill policy</span> at Bright Eyes and if an animal for any reason
              cannot get a home it will have shelter here with us for life. <br /> Our main purpose is a reduction in unnecessary suffering and
              distress of companion animals, through the provision of a rescue and re-homing service. We receive no government funding and rely purely
              on the generosity of the public to help us continue our work.
              <br /> All animals rehomed from us are neutered/spayed, vaccinated, wormed and deflead.
            </div>
          </div>

          <div className="about-us-split-image"> </div>
        </div>

        <Link to="/about">
          <button type="button" className="button about-us-read-more-button">
            Learn More
          </button>
        </Link>
      </div>

      <div className="stats-box-container">
        <div className="stats-box-1">
          <div className="stats-box-title">2000+</div>
          <div className="stats-box-info">Pets Adopted</div>
        </div>
        <div className="stats-box-2">
          <div className="stats-box-title">20+</div>
          <div className="stats-box-info">Voulnteers</div>
        </div>
        <div className="stats-box-3">
          <div className="stats-box-title">30+</div>
          <div className="stats-box-info">Years Experience</div>
        </div>
      </div>

      <div className="get-involved-container-home">
        <div className="get-involved-header">Get Involved</div>

        <div className="get-involved-split-container">
          <div className="get-involved-split">
            <div className="involved-main-text"> Adopt</div>
            <div className="involved-image-1"></div>
            <Link to="/adoption">
              <button type="button" className="button get-involved-more-info-button">
                More Info
              </button>
            </Link>
            <div className="involved-main-subtext">
              Take a look at our pets for Adoption. Join the 2000+ other people and find the perfect pet for your home!
            </div>
          </div>
          <div className="get-involved-split">
            <div className="involved-main-text"> Donate</div>
            <div className="involved-image-2"> </div>
            <Link to="/donate">
              <button type="button" className="button get-involved-more-info-button">
                More Info
              </button>
            </Link>
            <div className="involved-main-subtext">
              Unfortunately, we receive no government funding and rely purely on the generosity of the public to help us continue our work.
            </div>
          </div>
          <div className="get-involved-split">
            <div className="involved-main-text"> Volunteer</div>
            <div className="involved-image-3"> </div>
            <Link to="/forms/volunteer">
              <button type="button" className="button get-involved-more-info-button">
                More Info
              </button>
            </Link>
            <div className="involved-main-subtext">
              Our fantastic volunteers are the backbone of Bright Eyes, want to help care for the animals and earn some valuable experience?
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us-container">
        <div className="contact-us-header">Contact Us</div>

        <div className="contact-us-split-content">
          <div className="contact-us-split-name-email-message">
            {messageSentAlert === "" ? (
              <>
                <div className="errorAlertText">{errorAlertText}</div>
                <form onSubmit={(e) => sendFormEmail(e)}>
                  <div className="contact-us-name-email-row">
                    <div className="contact-us-name-col">
                      <div className="name-text">Name</div>
                      <input
                        className="name-form-box"
                        onInput={(e) => {
                          updateForm(e);
                        }}
                        value={name}
                        type="text"
                        name="name"
                      />
                    </div>
                    <div className="contact-us-email-col">
                      <div className="email-text">Email</div>
                      <input
                        className="email-form-box"
                        onInput={(e) => {
                          updateForm(e);
                        }}
                        value={senderEmail}
                        type="text"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="contact-us-message">
                    <div className="message-text">Message</div>
                    <textarea
                      className="message-form-box"
                      onInput={(e) => {
                        updateForm(e);
                      }}
                      value={message}
                      type="text"
                      name="message"
                    />
                  </div>
                  <button
                    className="button contact-us-submit-button"
                    type="submit"
                    // onClick={() => {
                    //   contactUsSubmitHandler();
                    // }}
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <>
                {messageSentAlert === "loading" ? (
                  <>
                    <div className="Loading-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </>
                ) : (
                  <>
                    {messageSentAlert === "Success" ? (
                      <>
                        <div className="messageSentContainer">
                          <div className="messageSentContent">Message sent successfully.</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>Our email Server is down, please message us on Facebook</div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <div className="contact-us-split-image"> </div>
        </div>
      </div>

      <div className="info-container">
        <div className="info-split-container">
          <div className="info-split">
            <div className="info-header">Location</div>
            <div className="info-main-text">
              53 Killymittan Road,
              <br />
              BT94 2FW,
              <br />
              Ballinamallard
            </div>
          </div>
          <div className="info-split">
            <div className="info-header">Hours</div>
            <div className="info-main-text">
              {" "}
              <span className="bold-noto">Mon - Sun:</span> 12:00 – 15:00
              <br />
            </div>
          </div>
          <div className="info-split">
            <div className="info-header">Contact Info</div>
            <div className="info-main-text">
              {" "}
              <span className="bold-noto">Mobile:</span> 07710607816
              <br />
              <span className="bold-noto">Phone:</span> 028 66 388885
              <br />
              <span className="bold-noto">Email:</span> brighteyes.sanctuary@btinternet.com
            </div>
          </div>
          <div className="info-split">
            <div className="info-header">Follow Us</div>
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/brighteyes.a.s/">
              <span className="iconify" data-icon="akar-icons:facebook-fill" data-width="20" data-height="20"></span>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/brighteyesanimalsanctuary">
              <span className="iconify" data-icon="akar-icons:instagram-fill" data-width="20" data-height="20"></span>
            </a>
          </div>
        </div>
      </div>

      <Map />
    </>
  );
}

export default Home;
