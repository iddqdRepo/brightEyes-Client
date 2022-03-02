import React, { useState } from "react";
import * as api from "../api/apiIndex.js";
import { Helmet } from "react-helmet-async";

function FormVolunteer() {
  const type = "Volunteer";
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const [volunteerForm, setVolunteerForm] = useState({
    type: "Volunteer",
    date: new Date(),
    aboutQuestions: {
      title: "",
      name: "",
      address: "",
      postcode: "",
      homePhone: "",
      workPhone: "",
      mobile: "",
      email: "",
      occupation: "",
      overSixteen: "",
    },
    emergencyContactInfo: {
      emergencyContactTitle: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhonePrimary: "",
      emergencyContactPhoneSecondary: "",
    },
    healthInfo: {
      physicallyFit: "",
      tetanus: "",
      healthConditionSpecialNeeds: "",
      healthConditionSpecialNeedsDetails: "",
    },
    volunteeringInfo: {
      workInterestedIn: "",
      maxHours: "",
      timeSlot: "",
      daysOfTheWeek: "",
      employeeOrVolunteerAnimals: "",
    },
    refereeInfo: {
      refereeTitle: "",
      refereeName: "",
      refereeRelationship: "",
      refereeAddress: "",
      refereePostcode: "",
      refereePhone: "",
      refereeEmail: "",
    },
    offenderInfo: {
      offender: "",
      offenderDetails: "",
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    archive: "No",
  });

  const [warningText, setWarningText] = useState("");
  const sendFormEmail = async () => {
    const data = {
      name: volunteerForm.aboutQuestions.name,
      senderEmail: "",
      message: "",
      type,
    };

    await api.sendMail(data);
  };

  // const handleCheckBox = (e, e, category = "", subcategory = "")

  const handleChange = (e, category = "") => {
    const key = e.target.name;
    let value = e.target.value;
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
      const chosenCategory = { ...volunteerForm[category] };
      chosenCategory[key] = value;
      console.log("chosenCategory ", chosenCategory);
      console.log("key ", key);
      console.log("value ", value);
      setVolunteerForm({ ...volunteerForm, [category]: chosenCategory });
    } else {
      setVolunteerForm({ ...volunteerForm, [key]: value });
    }
  };
  const submitForm = async (e) => {
    if (Object.values(volunteerForm.aboutQuestions).some((x) => x === "")) {
      //^If the animal submitted has blank fields
      e.preventDefault();
      setWarningText("Please fill in all fields");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // console.log(animal);
    } else {
      //   //^Submit the
      e.preventDefault();
      setSubmittedSuccessfully(true);
      api.addForm("volunteer", volunteerForm);
      sendFormEmail();
    }
  };

  return (
    <>
      <Helmet>
        <title>Volunteer Application Form</title>
        <meta name="description" content="Apply to be a valued volunteer at Bright Eyes Animal Santuary, Fermanagh." />
        <link rel="canonical" href="/forms/volunteer" />
      </Helmet>
      <div className="individual-form-page-container">
        <div className="individual-form-page-content-container">
          <div className="individual-form-header">Application to volunteer at Bright Eyes Animal Sanctuary</div>
          <div className="individual-form-sub-header">Please answer ALL the following questions:</div>
          {warningText ? <div className="admin-warning">{warningText}</div> : <div> </div>}

          <form onSubmit={(e) => submitForm(e)}>
            <div className="adoption-form-content-container">
              <fieldset className="fieldset">
                <legend>About You</legend>
                <div className="adoption-form-content">
                  <label htmlFor="title" className="adoption-form-title">
                    Title
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="title"
                    name="title"
                    value={volunteerForm.aboutQuestions.title}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="name" className="adoption-form-title">
                    Name
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="name"
                    name="name"
                    value={volunteerForm.aboutQuestions.name}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="address" className="adoption-form-title">
                    Address
                  </label>
                  <textarea
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="address"
                    name="address"
                    value={volunteerForm.aboutQuestions.address}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="postcode" className="adoption-form-title">
                    Postcode
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={volunteerForm.aboutQuestions.postcode}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="homePhone" className="adoption-form-title">
                    Home Phone
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="homePhone"
                    name="homePhone"
                    value={volunteerForm.aboutQuestions.homePhone}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="workPhone" className="adoption-form-title">
                    Work Phone
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="workPhone"
                    name="workPhone"
                    value={volunteerForm.aboutQuestions.workPhone}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="mobile" className="adoption-form-title">
                    Mobile
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={volunteerForm.aboutQuestions.mobile}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="email" className="adoption-form-title">
                    Email
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="email"
                    name="email"
                    value={volunteerForm.aboutQuestions.email}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="occupation" className="adoption-form-title">
                    Occupation
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={volunteerForm.aboutQuestions.occupation}
                    onInput={(e) => {
                      handleChange(e, "aboutQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="overSixteen" className="adoption-form-title">
                    I am over 16
                  </label>
                  <div className="checkbox-form">
                    <input type="checkbox" id="overSixteen" name="overSixteen" value="Yes" onClick={(e) => handleChange(e, "aboutQuestions")} />
                  </div>
                </div>
              </fieldset>

              {/* //* ---------------------- Emergency Contact Info */}
              <fieldset className="fieldset">
                <legend>Emergency Contact Infomation</legend>
                <div className="adoption-form-content">
                  <label htmlFor="emergencyContactTitle" className="adoption-form-title">
                    Title
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="emergencyContactTitle"
                    name="emergencyContactTitle"
                    value={volunteerForm.emergencyContactInfo.emergencyContactTitle}
                    onInput={(e) => {
                      handleChange(e, "emergencyContactInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="emergencyContactName" className="adoption-form-title">
                    Name
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={volunteerForm.emergencyContactInfo.emergencyContactName}
                    onInput={(e) => {
                      handleChange(e, "emergencyContactInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="emergencyContactRelationship" className="adoption-form-title">
                    Relationship to you?
                  </label>
                  <textarea
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="emergencyContactRelationship"
                    name="emergencyContactRelationship"
                    placeholder="e.g. Father, Mother"
                    value={volunteerForm.emergencyContactInfo.emergencyContactRelationship}
                    onInput={(e) => {
                      handleChange(e, "emergencyContactInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="emergencyContactPhonePrimary" className="adoption-form-title">
                    Phone (primary)
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="emergencyContactPhonePrimary"
                    name="emergencyContactPhonePrimary"
                    value={volunteerForm.emergencyContactInfo.emergencyContactPhonePrimary}
                    onInput={(e) => {
                      handleChange(e, "emergencyContactInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="emergencyContactPhoneSecondary" className="adoption-form-title">
                    Phone (seconadry)
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="emergencyContactPhoneSecondary"
                    name="emergencyContactPhoneSecondary"
                    value={volunteerForm.emergencyContactInfo.emergencyContactPhoneSecondary}
                    onInput={(e) => {
                      handleChange(e, "emergencyContactInfo");
                    }}
                  />
                </div>
              </fieldset>
              {/* //* ---------------------- Health Info */}
              <fieldset className="fieldset">
                <legend>Health Questions</legend>
                <div className="adoption-form-content">
                  <label htmlFor="physicallyFit" className="adoption-form-title">
                    Are you physically fit?
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="physicallyFit"
                        name="physicallyFit"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "healthInfo");
                        }}
                      >
                        <option value="choose">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="tetanus" className="adoption-form-title">
                    Have you had a Tetanus Booster in the last 10 years
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="tetanus"
                        name="tetanus"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "healthInfo");
                        }}
                      >
                        <option value="choose">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="healthConditionSpecialNeeds" className="adoption-form-title">
                    Do you have any health conditions or special needs that could affect your ability to volunteer?
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="healthConditionSpecialNeeds"
                        name="healthConditionSpecialNeeds"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "healthInfo");
                        }}
                      >
                        <option value="choose">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                {volunteerForm.healthInfo.healthConditionSpecialNeeds === "Yes" ? (
                  <>
                    <div className="adoption-form-content">
                      <label htmlFor="healthConditionSpecialNeedsDetails" className="adoption-form-title">
                        Please give brief details of the health condition or special needs
                      </label>
                      <input
                        className="animal-form-box"
                        autoComplete="off"
                        type="text"
                        id="healthConditionSpecialNeedsDetails"
                        name="healthConditionSpecialNeedsDetails"
                        value={volunteerForm.healthInfo.healthConditionSpecialNeedsDetails}
                        onInput={(e) => {
                          handleChange(e, "healthInfo");
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </fieldset>
              {/* //* ---------------------- Volunteering Info */}
              <fieldset className="fieldset">
                <legend>Volunteering Questions</legend>
                <div className="adoption-form-content">
                  <label htmlFor="workInterestedIn" className="adoption-form-title">
                    What area of the sanctuary you would like to work in
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="workInterestedIn"
                    name="workInterestedIn"
                    placeholder="e.g. Kennels, Dog Walking, Catteries"
                    value={volunteerForm.volunteeringInfo.workInterestedIn}
                    onInput={(e) => {
                      handleChange(e, "volunteeringInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="maxHours" className="adoption-form-title">
                    What are the maximum hours you can commit to each week?
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="maxHours"
                    name="maxHours"
                    placeholder="e.g. 4 hours per week"
                    value={volunteerForm.volunteeringInfo.maxHours}
                    onInput={(e) => {
                      handleChange(e, "volunteeringInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="timeSlot" className="adoption-form-title">
                    Can you commit to a specific time slot each week?
                  </label>
                  <textarea
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="timeSlot"
                    name="timeSlot"
                    placeholder="e.g. Yes, 2 hours Saturday and Sunday"
                    value={volunteerForm.volunteeringInfo.timeSlot}
                    onInput={(e) => {
                      handleChange(e, "volunteeringInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="daysOfTheWeek" className="adoption-form-title">
                    What days of the week could you help?
                  </label>
                  <textarea
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="daysOfTheWeek"
                    name="daysOfTheWeek"
                    placeholder="e.g. Mon, Tues and Thurs"
                    value={volunteerForm.volunteeringInfo.daysOfTheWeek}
                    onInput={(e) => {
                      handleChange(e, "volunteeringInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="employeeOrVolunteerAnimals" className="adoption-form-title">
                    Are you an employee or volunteer eith any other charity/organization involved with the care of animals?
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="employeeOrVolunteerAnimals"
                        name="employeeOrVolunteerAnimals"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "volunteeringInfo");
                        }}
                      >
                        <option value="choose">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>
              {/* //* ---------------------- Referee Info */}
              <fieldset className="fieldset">
                <legend>Referee Information</legend>
                <div className="adoption-form-content">
                  <label htmlFor="refereeTitle" className="adoption-form-title">
                    Title
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="refereeTitle"
                    name="refereeTitle"
                    value={volunteerForm.refereeInfo.refereeTitle}
                    onInput={(e) => {
                      handleChange(e, "refereeInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="refereeName" className="adoption-form-title">
                    Name
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="refereeName"
                    name="refereeName"
                    value={volunteerForm.refereeInfo.refereeName}
                    onInput={(e) => {
                      handleChange(e, "refereeInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="refereeRelationship" className="adoption-form-title">
                    Relationship to you?
                  </label>
                  <textarea
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="refereeRelationship"
                    name="refereeRelationship"
                    placeholder="e.g. Father, Mother"
                    value={volunteerForm.refereeInfo.refereeRelationship}
                    onInput={(e) => {
                      handleChange(e, "refereeInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="refereeAddress" className="adoption-form-title">
                    Address
                  </label>
                  <textarea
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="refereeAddress"
                    name="refereeAddress"
                    value={volunteerForm.refereeInfo.refereeAddress}
                    onInput={(e) => {
                      handleChange(e, "refereeInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="refereePostcode" className="adoption-form-title">
                    Postcode
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="refereePostcode"
                    name="refereePostcode"
                    value={volunteerForm.refereeInfo.refereePostcode}
                    onInput={(e) => {
                      handleChange(e, "refereeInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="refereePhone" className="adoption-form-title">
                    Phone
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="refereePhone"
                    name="refereePhone"
                    value={volunteerForm.refereeInfo.refereePhone}
                    onInput={(e) => {
                      handleChange(e, "refereeInfo");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="refereeEmail" className="adoption-form-title">
                    Email
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="refereeEmail"
                    name="refereeEmail"
                    value={volunteerForm.refereeInfo.refereeEmail}
                    onInput={(e) => {
                      handleChange(e, "refereeInfo");
                    }}
                  />
                </div>
              </fieldset>
              {/* //* ---------------------- Offender Info */}
              <fieldset className="fieldset">
                <legend>Rehabilitation of Offenders Act 1974</legend>
                <div className="adoption-form-content">
                  <label htmlFor="offender" className="adoption-form-title">
                    Have you any unspent criminal convictions registered against you?
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="offender"
                        name="offender"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "offenderInfo");
                        }}
                      >
                        <option value="choose">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                {volunteerForm.offenderInfo.offender === "Yes" ? (
                  <div className="adoption-form-content">
                    <label htmlFor="offenderDetails" className="adoption-form-title">
                      Please briefly state the convictions:
                    </label>
                    <textarea
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="offenderDetails"
                      name="offenderDetails"
                      value={volunteerForm.offenderInfo.offenderDetails}
                      onInput={(e) => {
                        handleChange(e, "offenderInfo");
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </fieldset>
              {/* //* ---------------------- Protecting Your Personal Data */}
              <fieldset className="fieldset">
                <legend>Protecting Your Personal Data</legend>
                <div className="text-body-form">
                  The information on this form will be used to process your volunteering application. If you are successful, the information will
                  continue to be used in connection with your volunteering for Bright Eyes Animal Sanctuary. If you cease to volunteer for us, we may
                  retain your information for a reasonable period of time for evaluation purposes. By submitting this form online or returning the
                  signed form to us, you will be consenting to us using your personal information in the manner above.
                </div>
              </fieldset>
              {/* //* ---------------------- Agreement */}
              <fieldset className="fieldset">
                <legend>Agreement</legend>
                <div className="text-body-form">
                  People volunteering at Bright Eyes must not persue any activity whose policies and objectives they know or suspect are inconsistent
                  with the objectives or policies of Bright Eyes. <br />
                  All volunteers working for Bright Eyes will ensure that, in that capacity, they do not issue any statement or otherwise act in a
                  manner which would be contrary to the stated objectives or policies of Bright Eyes
                </div>
              </fieldset>
              {/* onClick={() => console.log(animalForm)} */}
              {submittedSuccessfully ? (
                <div className="individual-form-header">Thank you</div>
              ) : (
                <button className="button submit-form-button" type="submit">
                  Submit Form
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormVolunteer;
