import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Forms() {
  let navigate = useNavigate();
  const onClickOnlineFormAdoptionButton = (type) => {
    navigate(`/forms/adoption`, {
      state: {
        detail: { type },
      },
    });
  };

  return (
    <div className="forms-page-container">
      <div className="forms-page-header">Forms</div>
      <div className="adoption-subtext">
        Here are the forms for Dog and Cat Adoption, Volunteering, Gift aid and standing orders.
        <br />
        Simply fill them in online and click "submit" or download, print off and post them to us.
      </div>
      <div className="forms-page-content-container">
        <div className="forms-page-content">
          <div className="forms-page-content-left">
            <div className="forms-page-name">Dog Adoption Form</div>
          </div>
          <div className="forms-page-content-right">
            <div className="forms-page-fill-online-button">
              <button className="button" onClick={() => onClickOnlineFormAdoptionButton("Dog")}>
                <span className="iconify-inline btn-icon" data-icon="bx:bxs-edit-alt" data-width="15"></span>Fill Online
              </button>
            </div>
            {/* <div className="forms-page-download-button">
              <button className="button">
                <span className="iconify-inline btn-icon" data-icon="bx:bx-download" data-width="15"></span>Download
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="forms-page-content-container">
        <div className="forms-page-content">
          <div className="forms-page-content-left">
            <div className="forms-page-name">Cat Adoption Form</div>
            {/* <div className="forms-page-subtext">
              Lorem ipsum
            </div> */}
          </div>
          <div className="forms-page-content-right">
            <div className="forms-page-fill-online-button">
              <button className="button" onClick={() => onClickOnlineFormAdoptionButton("Cat")}>
                <span className="iconify-inline btn-icon" data-icon="bx:bxs-edit-alt" data-width="15"></span>Fill Online
              </button>
            </div>
            {/* <div className="forms-page-download-button">
              <button className="button">
                <span className="iconify-inline btn-icon" data-icon="bx:bx-download" data-width="15"></span>Download
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="forms-page-content-container">
        <div className="forms-page-content">
          <div className="forms-page-content-left">
            <div className="forms-page-name">Gift Aid Form</div>
            {/* <div className="forms-page-subtext">
              Lorem ipsum
            </div> */}
          </div>
          <div className="forms-page-content-right">
            <div className="forms-page-fill-online-button">
              <Link to="/forms/giftaid">
                <button className="button">
                  <span className="iconify-inline btn-icon" data-icon="bx:bxs-edit-alt" data-width="15"></span>Fill Online
                </button>
              </Link>
            </div>
            {/* <div className="forms-page-download-button">
              <button className="button">
                <span className="iconify-inline btn-icon" data-icon="bx:bx-download" data-width="15"></span>Download
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="forms-page-content-container">
        <div className="forms-page-content">
          <div className="forms-page-content-left">
            <div className="forms-page-name">Volunteer Form</div>
            {/* <div className="forms-page-subtext">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero aliquam doloribus veritatis illo inventore culpa. Numquam perspiciatis
              nostrum aliquid error.
            </div> */}
          </div>
          <div className="forms-page-content-right">
            <div className="forms-page-fill-online-button">
              <Link to="/forms/volunteer">
                <button className="button">
                  <span className="iconify-inline btn-icon" data-icon="bx:bxs-edit-alt" data-width="15"></span>Fill Online
                </button>
              </Link>
            </div>
            {/* <div className="forms-page-download-button">
              <button className="button">
                <span className="iconify-inline btn-icon" data-icon="bx:bx-download" data-width="15"></span>Download
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forms;
