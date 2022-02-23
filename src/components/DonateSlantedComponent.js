import React from "react";
import { Link } from "react-router-dom";

function DonateSlantedComponent() {
  return (
    <div className="slanted-div-donate">
      <div className="slanted-div-donate-content-container">
        <div className="slanted-div-left-donate-text-container">
          <span className="donation-script-text">Please</span> <br />
          <span className="donation-header">Make a Donation</span> <br />
          <div className="donation-subtext">
            In the past 5 years we have rehomed over 1,000 Cats and Dogs. We receive no government funding and rely purely on the generosity of the
            public to help us continue our work. We would be grateful if you would like to set up a standing order each month or leave a legacy in
            your will, your contribution will make a huge difference to animal welfare and help us continue to rescue more animals that need us.
          </div>
          <br />
        </div>
        <div className="slanted-div-right-donate-button-container">
          <Link to="/donate">
            <button type="button" className="button slanted-div-donate-button">
              Donate
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DonateSlantedComponent;
