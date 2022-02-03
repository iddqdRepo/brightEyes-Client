import React, { useState } from "react";
import * as api from "../api/apiIndex.js";

function FormVolunteer() {
  const type = "Volunteer";
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
      api.addForm("volunteer", volunteerForm);
      sendFormEmail();
    }
  };

  return (
    <div className="individual-form-page-container">
      <div className="individual-form-page-content-container">
        <div className="individual-form-header">Application to volunteer at Bright Eyes Animal Sanctuary</div>
        <div className="individual-form-sub-header">Please answer ALL the following questions:</div>
        {warningText ? <div className="admin-warning">Please Fill in all fields</div> : <div> </div>}

        <form onSubmit={(e) => submitForm(e)}>
          <div className="adoption-form-content-container">
            <fieldset className="fieldset">
              <legend>About You</legend>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Title</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="breed"
                  name="title"
                  value={volunteerForm.aboutQuestions.title}
                  onInput={(e) => {
                    handleChange(e, "aboutQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Name</div>
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
                <div className="adoption-form-title">Address</div>
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
                <div className="adoption-form-title">Postcode</div>
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
                <div className="adoption-form-title">Home Phone</div>
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
                <div className="adoption-form-title">Work Phone</div>
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
                <div className="adoption-form-title">Mobile</div>
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
                <div className="adoption-form-title">Email</div>
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
                <div className="adoption-form-title">Occupation</div>
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
                <div className="adoption-form-title">I am over 16</div>
                <div className="checkbox-form">
                  <input type="checkbox" id="overSixteen" name="overSixteen" value="Yes" onClick={(e) => handleChange(e, "aboutQuestions")} />
                </div>
              </div>
            </fieldset>
            {/* //* ---------------------- Emergency Contact Info */}
            <fieldset className="fieldset">
              <legend>Emergency Contact Infomation</legend>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Title</div>
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
                <div className="adoption-form-title">Name</div>
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
                <div className="adoption-form-title">Relationship to you?</div>
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
                <div className="adoption-form-title">Phone (primary)</div>
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
                <div className="adoption-form-title">Phone (seconadry)</div>
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
                <div className="adoption-form-title">Are you physically fit?</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
                      name="physicallyFit"
                      className="dropdown-select"
                      onChange={(e) => {
                        handleChange(e, "healthInfo");
                      }}
                    >
                      <option value="choose">Select…</option>
                      <option value="House">Yes</option>
                      <option value="Flat">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Have you had a Tetanus Booster in the last 10 years</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
                      name="tetanus"
                      className="dropdown-select"
                      onChange={(e) => {
                        handleChange(e, "healthInfo");
                      }}
                    >
                      <option value="choose">Select…</option>
                      <option value="Own">Own</option>
                      <option value="Rent">Rent</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">
                  Do you have any health conditions or special needs that could affect your ability to volunteer?
                </div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
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
                    <div className="adoption-form-title">Please give brief details of the health condition or special needs</div>
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
                <div className="adoption-form-title">Please tell us what area of the sanctuary you would like to work in</div>
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
                <div className="adoption-form-title">What are the maximum hours you can commit to each week?</div>
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
                <div className="adoption-form-title">Can you commit to a specific time slot each week?</div>
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
                <div className="adoption-form-title">What days of the week could you help?</div>
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
                <div className="adoption-form-title">
                  Are you an employee or volunteer eith any other charity/organization involved with the care of animals?
                </div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
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
                <div className="adoption-form-title">Title</div>
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
                <div className="adoption-form-title">Name</div>
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
                <div className="adoption-form-title">Relationship to you?</div>
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
                <div className="adoption-form-title">Address</div>
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
                <div className="adoption-form-title">Postcode</div>
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
                <div className="adoption-form-title">Phone</div>
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
                <div className="adoption-form-title">Email</div>
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
                <div className="adoption-form-title">Have you any unspent criminal convictions registered against you?</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
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
                  <div className="adoption-form-title">Please briefly state the convictions:</div>
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
                People volunteering at Bright Eyes must not persue any activity wholse policies and objectives they know or suspect are inconsistent
                with the objectives or policies of Bright Eyes. <br />
                All volunteers working for Bright Eyes will ensure that, inn that capacity, they do not issue any statement or otherwise act in a
                manner which would be contrary to the stated objectives or policies of Bright Eyes
              </div>
            </fieldset>
            {/* onClick={() => console.log(animalForm)} */}
            <button className="button submit-form-button" type="submit">
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormVolunteer;
