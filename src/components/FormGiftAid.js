import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as api from "../api/apiIndex.js";

function FormGiftAid() {
  let uuid = uuidv4();

  const [giftAidForm, setGiftAidForm] = useState({
    type: "GiftAid",
    date: new Date(),
    giftAidFuture: "",
    giftAidPast: "",
    aboutQuestions: {
      name: "",
      address: "",
      postcode: "",
      phone: "",
      mobile: "",
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    archive: "No",
  });

  const [warningText, setWarningText] = useState("");

  const postForm = async (s) => {
    await api.addForm(s);
  };

  // const handleCheckBox = (e, e, category = "", subcategory = "")

  const handleChange = (e, category = "") => {
    const key = e.target.name;
    let value = e.target.value;
    console.log("type = ", e.target.type);
    console.log("category is ", category);

    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        console.log("e.target.checked ");

        value = e.target.value;
      } else {
        console.log("e.target.unchecked ");
        value = "";
      }
    }

    if (category) {
      const chosenCategory = { ...giftAidForm[category] };
      chosenCategory[key] = value;
      // console.log("chosenCategory ", chosenCategory);
      // console.log("key ", key);
      // console.log("value ", value);
      setGiftAidForm({ ...giftAidForm, [category]: chosenCategory });
    } else {
      setGiftAidForm({ ...giftAidForm, [key]: value });
    }
  };

  const submitForm = async (e) => {
    console.log("submitform");
    if (Object.values(giftAidForm.aboutQuestions).some((x) => x === "")) {
      //^If the animal submitted has blank fields
      e.preventDefault();
      setWarningText("Please fill in all fields");
      console.log("Please fill in all fields");
      // console.log(animal);
    } else {
      //^Submit the
      e.preventDefault();
      // TODO adding forms for testing admin, add giftaid to controller
      api.addForm("giftAid", giftAidForm);
    }
  };

  return (
    <div className="individual-form-page-container">
      <div className="individual-form-page-content-container">
        <div className="individual-form-header">Gift Aid Declaration Form for Bright Eyes Animal Sanctuary</div>
        <div className="individual-form-sub-header">
          To qualify for Gift Aid, you must pay an amount of UK Income Tax and/or Capital Gains Tax at least equal to the tax that the charity
          reclaims on your donations in the appropriate tax year (currently 25p for each £1 given).
          <br />
          <br />
          For example, if you donated £100 to Bright Eyes, you must have paid at least £25 in Tax for that year for us to claim gift aid.
          <br />
          <br /> The Tax year starts on the 6th of April and ends on the 5th of April the next year.
        </div>
        {warningText ? <div className="admin-warning">Please Fill in all fields</div> : <div> </div>}

        <form onSubmit={(e) => submitForm(e)}>
          <div className="adoption-form-content-container">
            <fieldset className="fieldset">
              <legend>About You</legend>

              <div className="adoption-form-content">
                <div className="adoption-form-title">Name</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="name"
                  name="name"
                  value={giftAidForm.aboutQuestions.name}
                  onInput={(e) => {
                    handleChange(e, "aboutQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Address</div>
                <textarea
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="address"
                  name="address"
                  value={giftAidForm.aboutQuestions.address}
                  onInput={(e) => {
                    handleChange(e, "aboutQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Postcode</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={giftAidForm.aboutQuestions.postcode}
                  onInput={(e) => {
                    handleChange(e, "aboutQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Phone</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="phone"
                  name="phone"
                  value={giftAidForm.aboutQuestions.phone}
                  onInput={(e) => {
                    handleChange(e, "aboutQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Mobile</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={giftAidForm.aboutQuestions.mobile}
                  onInput={(e) => {
                    handleChange(e, "aboutQuestions");
                  }}
                />
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend>Gift Aid</legend>
              <div className="giftaid-form-content">
                <div className="adoption-form-title">I would like to Gift Aid future donations until further notice</div>
                <div className="checkbox-form">
                  <input type="checkbox" id="giftAidFuture" name="giftAidFuture" value="Yes" onClick={(e) => handleChange(e)} />
                </div>
              </div>
              <div className="giftaid-form-content">
                <div className="adoption-form-title">
                  I would like to Gift Aid previous donations for the current year, and all the previous four tax years
                </div>
                <div className="checkbox-form">
                  <input type="checkbox" id="giftAidPast" name="giftAidPast" value="Yes" onClick={(e) => handleChange(e)} />
                </div>
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend>Notes</legend>
              <ul className="legal-list">
                <span className="legal-header"> Notes:</span>
                <li className="legal-list-item">You can cancel this Declaration at any time by notifying Bright Eyes.</li>
                <li className="legal-list-item">
                  If your circumstances change and you no pay enough income or capital gains tax to cover the amount claimed by Bright Eyes, please
                  inform us in writing.
                </li>
                <li className="legal-list-item">
                  If you pay tax at the higher rate, you can claim further tax relief via your Self Assessment tax return (currently 25p for each £1
                  you give).
                </li>
                <li className="legal-list-item">Please notify Bright Eyes if you change your name or address.</li>
                <li className="legal-list-item">
                  Gift Aid is linked to basic rate tax. Basic rate tax is currently 20% which allows charities to reclaim 25 pence on the pound.
                </li>
                <li className="legal-list-item">Higher rate taxpayers can claim back the difference between basic rate and higher rate tax.</li>
              </ul>
            </fieldset>

            {/*  */}
            <button className="button submit-form-button" type="submit" onClick={() => console.log(giftAidForm)}>
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormGiftAid;
