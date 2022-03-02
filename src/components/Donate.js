import React, { useEffect, useState } from "react";
import * as api from "../api/apiIndex";
import { Helmet } from "react-helmet-async";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Donate() {
  const [senderEmail, setSenderEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messageSentAlert, setMessageSentAlert] = useState("");
  const [errorAlertText, setErrorAlertText] = useState("");
  const type = "message";
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    //^When donate button is clicked from another page
    //^ React-Router-Link goes to bottom of this page, this is to offset that
    window.scrollTo(0, 0);
  }, []);

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
  function createData(type, details) {
    return { type, details };
  }

  const rows = [
    createData("Bank", "Santander Bank"),
    createData("Sort Code", "09-01-26"),
    createData("Account Number", "23320595"),
    createData("Type", "Business"),
    createData("Name", "Bright Eyes Animal Sanctuary"),
    createData("Reference", "Bright Eyes Donation"),
  ];

  function BasicTable() {
    return (
      <div style={{ width: "100%" }}>
        <Table sx={{ width: 300, margin: "auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.type} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="right">{row.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Donate</title>
        <meta
          name="description"
          content="In the past 5 years we have rehomed over 1000 cats and dogs. We receive no government funding, every little helps."
        />
        <link rel="canonical" href="/donate" />
      </Helmet>
      <div className="donate-container">
        <div className="donate-header"></div>

        <div className="donate-split-content">
          <div className="donate-split-text">
            <div className="donate-split-text-title">Donate,</div>
            <div className="donate-split-text-title">Change a Life Today.</div>

            <div className="donate-split-text-description">
              In the past 5 years we have rehomed over <span className="slanted-about-us-bold-desc"> 1,000 Cats and Dogs. </span>
              <br />
              We receive no government funding and rely purely on the generosity of the public to help us continue our work. <br />
              We would be grateful if you would like to set up a standing order each month or leave a legacy in your will, your contribution will make
              a huge difference to animal welfare and help us continue to rescue more animals that need us.
            </div>
            {/* <a href="/about">
              <button type="button" className="button donate-donation-button">
                Make a donation
              </button>
            </a> */}
          </div>

          <div className="donate-split-image"></div>
        </div>
      </div>

      <div className="donate-container">
        {/* <PayPalButton createOrder={(data, actions) => createOrder(data, actions)} onApprove={(data, actions) => onApprove(data, actions)} /> */}
        <div className="donate-header">Donate</div>
        <div className="donate-subtext">
          Perfect for a one off donation <br />
          or recurring monthly donations <br />
          if you have a Paypal account.
        </div>
        <span className="iconify-inline" data-icon="akar-icons:arrow-down" data-width="40"></span>
        <div className="donate-paypal-content">
          <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="JPRFRRVZHSMY4" />
            <input
              type="image"
              id="image"
              className="paypal-donate-image"
              src="https://www.paypal-community.com/t5/image/serverpage/image-id/56084iFE8EEC50D9040CCB/image-size/large?v=v2&px=999"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />
            <img className="paypal-donate" alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </div>
        <div className="donate-header">Set up a Standing Order</div>
        <div className="donate-subtext">
          Perfect for a recurring <br />
          donation if you do not have a <br />
          Paypal account.
        </div>
        <span className="iconify-inline" data-icon="akar-icons:arrow-down" data-width="40"></span>
        <BasicTable />
      </div>
      <div className="donate-header">Your donation goes towards:</div>
      <div className="donate-split-content-container">
        <div className="adoption-split-content">
          <div className="adoption-split-points-left-container">
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="fluent:food-24-filled" data-width="40"></span>
              <span className="adoption-point-text"> Food </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="ic:sharp-model-training" data-width="40"></span>
              <span className="adoption-point-text"> Training </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="map:veterinary-care" data-width="40"></span>
              <span className="adoption-point-text"> Vet Bills </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="map:insurance-agency" data-width="40"></span>
              <span className="adoption-point-text"> Insurance </span>
            </div>
          </div>
          <div className="adoption-split-points-left-container">
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="bx:bxs-blanket" data-width="40"></span>
              <span className="adoption-point-text"> Bedding </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="mdi:toy-brick-plus" data-width="40"></span>
              <span className="adoption-point-text"> Toys </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="pepicons:electricity-print" data-width="40"></span>
              <span className="adoption-point-text"> Electricity </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="icon-park-outline:oil-industry" data-width="40"></span>
              <span className="adoption-point-text"> Heating </span>
            </div>
          </div>

          <div className="adoption-split-points-right-container">
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="mdi:needle" data-width="40"></span>
              <span className="adoption-point-text"> Vaccinations </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="healthicons:emergency-post-outline" data-width="40"></span>
              <span className="adoption-point-text"> Emergencies </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="wpf:maintenance" data-width="40"></span>
              <span className="adoption-point-text"> Maintenance </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="ep:more-filled" data-width="40"></span>
              <span className="adoption-point-text"> And More </span>
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
                        <div>Message sending failed, please try again</div>
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
    </>
  );
}

export default Donate;
