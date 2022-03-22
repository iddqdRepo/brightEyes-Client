import React, { useState, useRef } from "react";
// import * as api from "../api/apiIndex.js";
// import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import Test1 from "./test.js";

function FormAdoption() {
  // const location = useLocation();
  // let animalType = location.state.detail.type;
  const type = "Adoption";
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const mainAnimalFormRef = useRef({
    aboutQuestions: {
      title: "",
      name: "",
      address: "",
      postcode: "",
      phone: "",
      gardenOrYardInfo: {
        gardenOrYardSize: "",
        fullyEnclosed: "",
        fenceHeight: "",
      },
    },
    dogMatchingQuestions: {
      dogName: "",
      dogSize: "",
      dogType: "",
      dogAge: "",
      dogSex: "",
    },
    homeQuestions: {
      planning: {
        baby: "",
        moving: "",
        workHoursChange: "",
        holiday: "",
      },
    },
  });

  console.log("ref = ", mainAnimalFormRef.current);
  // const [animalForm, setAnimalForm] = useState({
  //   aboutQuestions: {
  //     title: "",
  //     name: "",
  //     address: "",
  //     postcode: "",
  //     // phone: "",
  //   },
  // });
  const handleChange = (e, category = "", subcategory = "") => {
    const key = e.target.name;
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        value = e.target.value;
      } else {
        value = "";
      }
    }
    if (subcategory) {
      mainAnimalFormRef.current[category][subcategory][key] = value;
    } else {
      mainAnimalFormRef.current[category][key] = value;
    }
  };

  function CreateTextBox({ title, idName, category, subcategory }) {
    return (
      <div className="adoption-form-content">
        <label htmlFor={idName} className="adoption-form-title">
          {title}
        </label>
        <input
          className="animal-form-box"
          autoComplete="off"
          type="text"
          id={idName}
          name={idName}
          onChange={(e) => {
            handleChange(e, category, subcategory);
          }}
        />
      </div>
    );
  }
  function CreateComboBox({ title, idName, optionObject, category, subcategory }) {
    console.log("Object.keys(optionObject)", Object.keys(optionObject));
    return (
      <div className="adoption-form-content">
        <label htmlFor="dogSize" className="adoption-form-title">
          {title}
        </label>
        <div className="filter-dropdown">
          <div className="dropdown">
            <select
              id={idName}
              name={idName}
              className="dropdown-select"
              onChange={(e) => {
                handleChange(e, category, subcategory);
              }}
            >
              <option value="choose">Select…</option>
              {Object.keys(optionObject).map((key) => {
                return (
                  <option key={optionObject[key] + key} value={key}>
                    {optionObject[key]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="individual-form-page-container">
        <div className="individual-form-page-content-container">
          <form>
            <div className="adoption-form-content-container">
              <fieldset className="fieldset">
                <legend>About You</legend>
                <CreateTextBox title="Title" idName="title" category="aboutQuestions" />
                <CreateTextBox title="Name" idName="name" category="aboutQuestions" />
                <CreateTextBox title="Address" idName="address" category="aboutQuestions" />
                <CreateTextBox title="Postcode" idName="postcode" category="aboutQuestions" />
                <CreateTextBox title="Phone" idName="phone" category="aboutQuestions" />
                <CreateTextBox title="Fence Height" idName="fenceHeight" category="aboutQuestions" subcategory="gardenOrYardInfo" />

                <CreateComboBox
                  title="What SIZE of dog are you looking for?"
                  idName="dogSize"
                  optionObject={{
                    Small: "Small (e.g. Terrier)",
                    Medium: "Medium (e.g. Collie)",
                    Large: "Large (e.g. Labrador)",
                    "Any Size": "Any Size",
                  }}
                  category="dogMatchingQuestions"
                />
                <div className="adoption-form-content">
                  <div className="adoption-form-title">Are you planning any of the following in the next 6 months</div>
                  <div>
                    <input type="checkbox" id="baby" name="baby" value="Yes" onClick={(e) => handleChange(e, "homeQuestions", "planning")} />
                    <label htmlFor="baby">A baby</label>
                  </div>
                  <div>
                    <input type="checkbox" id="moving" name="moving" value="Yes" onClick={(e) => handleChange(e, "homeQuestions", "planning")} />
                    <label htmlFor="moving">Moving house</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="workHoursChange"
                      name="workHoursChange"
                      value="Yes"
                      onClick={(e) => handleChange(e, "homeQuestions", "planning")}
                    />
                    <label htmlFor="workHoursChange">A change in work hours</label>
                  </div>
                  <div>
                    <input type="checkbox" id="holiday" name="holiday" value="Yes" onClick={(e) => handleChange(e, "homeQuestions", "planning")} />
                    <label htmlFor="holiday">A holiday (in the next month)</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </form>
          <button onClick={() => console.log("BTNmainAnimalFormRef.current.aboutQuestions", mainAnimalFormRef.current)}>button</button>
        </div>
      </div>
    </>
  );
}

export default FormAdoption;
