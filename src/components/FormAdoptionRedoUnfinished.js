import React, { useState, useRef } from "react";
import * as api from "../api/apiIndex.js";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

function FormAdoption() {
  const location = useLocation();
  let animalType = location.state.detail.type;
  const type = "Adoption";
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const animalForm = useRef({
    type: animalType,
    aboutQuestions: {
      title: "",
      name: "",
      address: "",
      postcode: "",
      phone: "",
      mobile: "",
      email: "",
    },
    dogMatchingQuestions: {
      dogName: "",
      dogSize: "",
      dogType: "",
      dogAge: "",
      dogSex: "",
    },
    catMatchingQuestions: {
      catName: "",
      catAge: "",
      catType: "",
      catColour: "",
      catSex: "",
      catAllergy: "",
    },
    homeQuestions: {
      homeType: "",
      rentOrOwn: "",
      townOrCountry: "",
      nextToRoad: "",
      gardenOrYard: "",
      gardenOrYardInfo: {
        gardenOrYardSize: "",
        fullyEnclosed: "",
        fenceHeight: "",
      },
      numAdults: "",
      numChildren: "",
      childrenAges: "",
      otherChildrenVisitInfo: {
        otherChildrenVisit: "",
        otherChildrenAges: "",
        otherChildrenVisitFrequency: "",
      },
      retired: "",
      planning: {
        baby: "",
        moving: "",
        workHoursChange: "",
        holiday: "",
      },
    },

    dogQuestions: {
      dogReason: "",
      dogHomeAloneInfo: {
        dogHomeAlone: "",
        dogHomeAloneHours: "",
        dogHomeAloneFrequency: "",
      },

      exerciseType: "",
      exerciseTime: "",
      dogSleepLocation: "",

      ownOtherDogsCurrentInfo: {
        ownOtherCurrentDogs: "",
        otherCurrentDogBreed: "",
        otherCurrentDogNeutered: "",
        otherCurrentDogTime: "",
      },
      dogOwnOtherPetsCurrentInfo: {
        dogOwnOtherCurrentPets: "",
        dogOtherCurrentPetTypes: "",
      },
      ownOtherDogsPastInfo: {
        ownOtherPastDogs: "",
        otherPastDogTime: "",
        otherDogFate: "",
      },

      dogAwareOfCostsAndLegal: "",
      dogHowSoon: "",
      dogFurtherInfo: "",
    },
    catQuestions: {
      catReason: "",
      catHomeAloneInfo: {
        catHomeAlone: "",
        catHomeAloneHours: "",
        catHomeAloneFrequency: "",
      },
      catSleepLocation: "",

      ownOtherCatsCurrentInfo: {
        ownOtherCurrentCats: "",
      },
      ownOtherPetsCurrentInfo: {
        ownOtherCurrentPets: "",
        otherCurrentPetTypes: "",
      },
      ownOtherCatsPastInfo: {
        ownOtherPastCats: "",
        otherPastCatTime: "",
        otherCatFate: "",
      },

      catAwareOfCostsAndLegal: "",
      catHowSoon: "",
      catFurtherInfo: "",
    },

    hearAboutUsInfo: {
      hearAboutUs: "",
      other: "",
    },
    updatedAt: {
      type: Date,
      default: new Date(),
    },
    archive: "No",
  });

  const [warningText, setWarningText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFormField, setShowFormField] = useState(false);

  const sendFormEmail = async () => {
    const data = {
      name: animalForm.current.aboutQuestions.name,
      senderEmail: "",
      message: "",
      type,
    };

    await api.sendMail(data);
  };

  useEffect(() => {
    console.log("Updated");
    if (animalForm.current.homeQuestions.gardenOrYard === "Yes") {
      setShowFormField(true);
    }
    setShowFormField(false);
  }, [animalForm]);

  // const handleCheckBox = (e, e, category = "", subcategory = "")

  const submitForm = async (e) => {
    if (Object.values(animalForm.current.aboutQuestions).some((x) => x === "")) {
      //^If the animal submitted has blank fields
      e.preventDefault();
      setWarningText("Please fill in all fields");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      //^Submit the
      e.preventDefault();
      setWarningText("");
      setLoading(true);
      try {
        await api.addForm("petAdoption", animalForm);
        setLoading(false);
        setSubmittedSuccessfully(true);
        sendFormEmail();
      } catch (error) {
        setLoading(false);
        setWarningText("ERROR SUBMITTING FORM, PLEASE CHECK YOUR INTERNET CONNECTION");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSubmittedSuccessfully(false);
      }
    }
  };

  const handleChange = (e, category = "", subcategory = "") => {
    {
      console.log("animalForm.current.homeQuestions.gardenOrYard ", animalForm.current.homeQuestions.gardenOrYard);
    }

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
      animalForm.current[category][subcategory][key] = value;
    } else {
      animalForm.current[category][key] = value;
    }
  };

  function CreateTextBox({ title, idName, placeholder, category, subcategory }) {
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
          placeholder={placeholder}
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
        <label htmlFor={idName} className="adoption-form-title">
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
      <Helmet>
        <title>Animal Application Form</title>
        <meta name="description" content="Apply to re-home a dog or cat from Bright Eyes Animal Santuary, Fermanagh." />
        <link rel="canonical" href="/forms/adoption" />
      </Helmet>
      <div className="individual-form-page-container">
        <div className="individual-form-page-content-container">
          <h1 className="individual-form-header">Application to Re-home a {animalForm.current.type} from Bright Eyes Animal Sanctuary</h1>
          <div className="individual-form-sub-header">Please answer ALL the following questions:</div>
          {warningText ? <div className="admin-warning">{warningText}</div> : <div> </div>}

          <form onSubmit={(e) => submitForm(e)}>
            <div className="adoption-form-content-container">
              <fieldset className="fieldset">
                <legend>About You</legend>
                <CreateTextBox title="Title" idName="title" category="aboutQuestions" />
                <CreateTextBox title="Name" idName="name" category="aboutQuestions" />
                <CreateTextBox title="Address" idName="address" category="aboutQuestions" />
                <CreateTextBox title="Postcode" idName="postcode" category="aboutQuestions" />
                <CreateTextBox title="Phone" idName="phone" category="aboutQuestions" />
                <CreateTextBox title="Mobile" idName="mobile" category="aboutQuestions" />
                <CreateTextBox title="Email" idName="email" category="aboutQuestions" />
              </fieldset>

              <fieldset className="fieldset">
                <legend>Matching Questions</legend>
                {animalForm.current.type === "Dog" ? (
                  <>
                    <CreateTextBox title="If you know the name of the dog, please enter it here." idName="dogName" category="dogMatchingQuestions" />
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
                    <CreateTextBox title="What TYPE of dog are you looking for?" idName="dogType" category="dogMatchingQuestions" />

                    <CreateComboBox
                      title="What AGE of dog are you looking for?"
                      idName="dogAge"
                      optionObject={{
                        Puppy: "Puppy",
                        "Less than 2 years": "Less than 2 years",
                        "2-8 years": "2-8 years",
                        "8+ years": "8+ years",
                        "Any age": "Any age",
                      }}
                      category="dogMatchingQuestions"
                    />

                    <CreateComboBox
                      title="What SEX of dog are you looking for?"
                      idName="dogSex"
                      optionObject={{ Male: "Male", Female: "Female", Either: "Either" }}
                      category="dogMatchingQuestions"
                    />
                  </>
                ) : (
                  <>
                    <CreateTextBox title="If you know the name of the cat, please enter it here." idName="catName" category="catMatchingQuestions" />
                    <CreateComboBox
                      title="What TYPE of cat are you looking for?"
                      idName="catType"
                      optionObject={{ "Short Haired": "Short Haired", "Semi Long Haired": "Semi Long Haired", "Long Haired": "Long Haired" }}
                      category="catMatchingQuestions"
                    />
                    <CreateComboBox
                      title="What AGE of cat are you looking for?"
                      idName="catAge"
                      optionObject={{
                        Kitten: "Kitten",
                        "Less than 2 years": "Less than 2 years",
                        "2-8 years": "2-8 years",
                        "8+ years": "8+ years",
                        "Any age": "Any age",
                      }}
                      category="catMatchingQuestions"
                    />

                    <CreateComboBox
                      title="What SEX of cat are you looking for?"
                      idName="catSex"
                      optionObject={{ Male: "Male", Female: "Female", Either: "Either" }}
                      category="catMatchingQuestions"
                    />

                    <CreateTextBox
                      title="What COLOUR of cat are you looking for?"
                      idName="catColour"
                      placeholder="e.g. Black"
                      category="catMatchingQuestions"
                    />

                    <CreateComboBox
                      title="Does anyone in the household have an allergy to cat fur?"
                      idName="catAllergy"
                      optionObject={{ Yes: "Yes", No: "No" }}
                      category="catMatchingQuestions"
                    />
                  </>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend>Home Questions</legend>

                <CreateComboBox
                  title="Your home is a:"
                  idName="homeType"
                  optionObject={{ House: "House", Flat: "Flat", Other: "Other" }}
                  category="homeQuestions"
                />

                <CreateComboBox
                  title="Do you:"
                  idName="rentOrOwn"
                  optionObject={{ Own: "Own", Rent: "Rent", Other: "Other" }}
                  category="homeQuestions"
                />

                <CreateComboBox
                  title="Do you live in the:"
                  idName="townOrCountry"
                  optionObject={{ Town: "Town", Country: "Country" }}
                  category="homeQuestions"
                />

                <CreateComboBox
                  title="Is your home next to a:"
                  idName="nextToRoad"
                  optionObject={{ "Main Road": "Main Road", "Side Road": "Side Road", Neither: "Neither" }}
                  category="homeQuestions"
                />

                <CreateComboBox
                  title="Do you have a garden or yard?"
                  idName="gardenOrYard"
                  optionObject={{ Yes: "Yes", No: "No", Communal: "Communal" }}
                  category="homeQuestions"
                />

                {animalForm.current.homeQuestions.gardenOrYard === "Yes" ? (
                  <>
                    <CreateTextBox
                      title="Please estimate the size of your garden/yard"
                      placeholder="e.g. 50ft x 50ft"
                      idName="gardenOrYardSize"
                      category="homeQuestions"
                      subcategory="gardenOrYardInfo"
                    />

                    {animalForm.current.type === "Dog" ? (
                      <>
                        <CreateComboBox
                          title="Is your garden/yard fully enclosed?"
                          idName="fullyEnclosed"
                          optionObject={{ Yes: "Yes", No: "No" }}
                          category="homeQuestions"
                          subcategory="gardenOrYardInfo"
                        />

                        {animalForm.current.homeQuestions.gardenOrYardInfo.fullyEnclosed === "Yes" ? (
                          <CreateComboBox
                            title="What height is the fence?"
                            idName="fenceHeight"
                            optionObject={{ "less than 4ft": "less than 4ft", "4ft-5ft": "4ft-5ft", "5ft-6ft": "5ft-6ft", "over 6ft": "over 6ft" }}
                            category="homeQuestions"
                            subcategory="gardenOrYardInfo"
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <CreateTextBox title="How many adults live at your home?" idName="numAdults" category="homeQuestions" />

                <div className="adoption-form-content">
                  <label htmlFor="numChildren" className="adoption-form-title">
                    How many children live at your home?
                  </label>
                  <input
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="numChildren"
                    name="numChildren"
                    onInput={(e) => {
                      handleChange(e, "homeQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="childrenAges" className="adoption-form-title">
                    Childrens ages
                  </label>
                  <textarea
                    className="animal-form-box"
                    autoComplete="off"
                    type="text"
                    id="childrenAges"
                    name="childrenAges"
                    placeholder="Leave blank if no children."
                    onInput={(e) => {
                      handleChange(e, "homeQuestions");
                    }}
                  />
                </div>
                <div className="adoption-form-content">
                  <label htmlFor="otherChildrenVisit" className="adoption-form-title">
                    Do other children visit your home?
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="otherChildrenVisit"
                        name="otherChildrenVisit"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "homeQuestions", "otherChildrenVisitInfo");
                        }}
                      >
                        <option value="choose">Select…</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
                {animalForm.current.homeQuestions.otherChildrenVisitInfo.otherChildrenVisit === "Yes" ? (
                  <>
                    <div className="adoption-form-content">
                      <label htmlFor="otherChildrenAges" className="adoption-form-title">
                        Ages of visiting children?
                      </label>
                      <input
                        className="animal-form-box"
                        autoComplete="off"
                        type="text"
                        id="otherChildrenAges"
                        name="otherChildrenAges"
                        placeholder="e.g. 7 & 10"
                        onInput={(e) => {
                          handleChange(e, "homeQuestions", "otherChildrenVisitInfo");
                        }}
                      />
                    </div>
                    <div className="adoption-form-content">
                      <label htmlFor="otherChildrenVisitFrequency" className="adoption-form-title">
                        How often do they visit?
                      </label>
                      <input
                        className="animal-form-box"
                        autoComplete="off"
                        type="text"
                        id="otherChildrenVisitFrequency"
                        name="otherChildrenVisitFrequency"
                        placeholder="e.g. Once a week?"
                        onInput={(e) => {
                          handleChange(e, "homeQuestions", "otherChildrenVisitInfo");
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="adoption-form-content">
                  <label htmlFor="retired" className="adoption-form-title">
                    Are you retired?
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="retired"
                        name="retired"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "homeQuestions");
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

              <fieldset className="fieldset">
                <legend>{animalForm.current.type} Questions</legend>
                {animalForm.current.type === "Dog" ? (
                  <>
                    <div className="adoption-form-content">
                      <label htmlFor="dogReason" className="adoption-form-title">
                        Do you want a dog for:
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="dogReason"
                            name="dogReason"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "dogQuestions");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Indoors">Indoors</option>
                            <option value="Outdoors">Outdoors</option>
                            <option value="Both">Both</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="adoption-form-content">
                      <label htmlFor="dogHomeAlone" className="adoption-form-title">
                        Will your dog be left at home alone?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="dogHomeAlone"
                            name="dogHomeAlone"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "dogQuestions", "dogHomeAloneInfo");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {animalForm.current.dogQuestions.dogHomeAloneInfo.dogHomeAlone === "Yes" ? (
                      <>
                        <div className="adoption-form-content">
                          <label htmlFor="dogHomeAloneHours" className="adoption-form-title">
                            <span className="subquestion"> Home Alone Question:</span> How many hours per day?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="dogHomeAloneHours"
                            name="dogHomeAloneHours"
                            placeholder=""
                            onInput={(e) => {
                              handleChange(e, "dogQuestions", "dogHomeAloneInfo");
                            }}
                          />
                        </div>
                        <div className="adoption-form-content">
                          <label htmlFor="dogHomeAloneFrequency" className="adoption-form-title">
                            <span className="subquestion">Home Alone Question:</span> How often?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="dogHomeAloneFrequency"
                            name="dogHomeAloneFrequency"
                            placeholder="e.g. every day"
                            onInput={(e) => {
                              handleChange(e, "dogQuestions", "dogHomeAloneInfo");
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="adoption-form-content">
                      <label htmlFor="exerciseType" className="adoption-form-title">
                        What type of exercise will your dog receive?
                      </label>
                      <input
                        className="animal-form-box"
                        autoComplete="off"
                        type="text"
                        id="exerciseType"
                        name="exerciseType"
                        placeholder="e.g. Walking, playing fetch"
                        onInput={(e) => {
                          handleChange(e, "dogQuestions");
                        }}
                      />
                    </div>
                    <div className="adoption-form-content">
                      <label htmlFor="exerciseTime" className="adoption-form-title">
                        How much daily exercise will you give your dog?
                      </label>
                      <input
                        className="animal-form-box"
                        autoComplete="off"
                        type="text"
                        id="exerciseTime"
                        name="exerciseTime"
                        placeholder="e.g. 2 Hours"
                        onInput={(e) => {
                          handleChange(e, "dogQuestions");
                        }}
                      />
                    </div>
                    <div className="adoption-form-content">
                      <label htmlFor="dogSleepLocation" className="adoption-form-title">
                        Where will your dog sleep at night?
                      </label>
                      <input
                        className="animal-form-box"
                        autoComplete="off"
                        type="text"
                        id="dogSleepLocation"
                        name="dogSleepLocation"
                        placeholder="e.g. In the kitchen"
                        onInput={(e) => {
                          handleChange(e, "dogQuestions");
                        }}
                      />
                    </div>

                    <div className="adoption-form-content">
                      <label htmlFor="ownOtherCurrentDogs" className="adoption-form-title">
                        Do you own other dogs?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="ownOtherCurrentDogs"
                            name="ownOtherCurrentDogs"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "dogQuestions", "ownOtherDogsCurrentInfo");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {animalForm.current.dogQuestions.ownOtherDogsCurrentInfo.ownOtherCurrentDogs === "Yes" ? (
                      <>
                        <div className="adoption-form-content">
                          <label htmlFor="otherCurrentDogBreed" className="adoption-form-title">
                            <span className="subquestion">Other dogs information:</span> Dog Breeds?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="otherCurrentDogBreed"
                            name="otherCurrentDogBreed"
                            placeholder="e.g. Collie"
                            onInput={(e) => {
                              handleChange(e, "dogQuestions", "ownOtherDogsCurrentInfo");
                            }}
                          />
                        </div>
                        <div className="adoption-form-content">
                          <label htmlFor="otherCurrentDogNeutered" className="adoption-form-title">
                            <span className="subquestion">Other dogs information:</span> Neutered?
                          </label>
                          <div className="filter-dropdown">
                            <div className="dropdown">
                              <select
                                id="otherCurrentDogNeutered"
                                name="otherCurrentDogNeutered"
                                className="dropdown-select"
                                onChange={(e) => {
                                  handleChange(e, "dogQuestions", "ownOtherDogsCurrentInfo");
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
                          <label htmlFor="otherCurrentDogTime" className="adoption-form-title">
                            <span className="subquestion">Other dogs information:</span> How long have you had them?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="otherCurrentDogTime"
                            name="otherCurrentDogTime"
                            placeholder="e.g. 2 years"
                            onInput={(e) => {
                              handleChange(e, "dogQuestions", "ownOtherDogsCurrentInfo");
                            }}
                          />
                        </div>
                      </>
                    ) : animalForm.current.dogQuestions.ownOtherDogsCurrentInfo.ownOtherCurrentDogs === "No" ? (
                      <div className="adoption-form-content">
                        <label htmlFor="ownOtherPastDogs" className="adoption-form-title">
                          Have you owned a dog before?
                        </label>
                        <div className="filter-dropdown">
                          <div className="dropdown">
                            <select
                              id="ownOtherPastDogs"
                              name="ownOtherPastDogs"
                              className="dropdown-select"
                              onChange={(e) => {
                                handleChange(e, "dogQuestions", "ownOtherDogsPastInfo");
                              }}
                            >
                              <option value="choose">Select…</option>
                              <option value="As Child">As a Child</option>
                              <option value="As Adult">As an Adult</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <> </>
                    )}
                    {animalForm.current.dogQuestions.ownOtherDogsPastInfo.ownOtherPastDogs === "As Child" ||
                    animalForm.current.dogQuestions.ownOtherDogsPastInfo.ownOtherPastDogs === "As Adult" ? (
                      <>
                        <div className="adoption-form-content">
                          <label htmlFor="otherPastDogTime" className="adoption-form-title">
                            How long did you have it?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="otherPastDogTime"
                            name="otherPastDogTime"
                            placeholder="e.g. 2 years"
                            onInput={(e) => {
                              handleChange(e, "dogQuestions", "ownOtherDogsPastInfo");
                            }}
                          />
                        </div>
                        <div className="adoption-form-content">
                          <label htmlFor="otherDogFate" className="adoption-form-title">
                            What happened to it?
                          </label>
                          <textarea
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="otherDogFate"
                            name="otherDogFate"
                            placeholder="e.g. Died of old age"
                            onInput={(e) => {
                              handleChange(e, "dogQuestions", "ownOtherDogsPastInfo");
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="adoption-form-content">
                      <label htmlFor="dogOwnOtherCurrentPets" className="adoption-form-title">
                        Do you own other pets?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="dogOwnOtherCurrentPets"
                            name="dogOwnOtherCurrentPets"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "dogQuestions", "dogOwnOtherPetsCurrentInfo");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {animalForm.current.dogQuestions.dogOwnOtherPetsCurrentInfo.dogOwnOtherCurrentPets === "Yes" ? (
                      <>
                        <div className="adoption-form-content">
                          <label htmlFor="dogOtherCurrentPetTypes" className="adoption-form-title">
                            What types of pets do you have?
                          </label>
                          <textarea
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="dogOtherCurrentPetTypes"
                            name="dogOtherCurrentPetTypes"
                            placeholder="e.g. 2 Cats, Hamster, Snake"
                            onInput={(e) => {
                              handleChange(e, "dogQuestions", "dogOwnOtherPetsCurrentInfo");
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="adoption-form-content">
                      <label htmlFor="dogAwareOfCostsAndLegal" className="adoption-form-title">
                        Are you fully aware of the costs and legal implications of keeping a dog?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="dogAwareOfCostsAndLegal"
                            name="dogAwareOfCostsAndLegal"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "dogQuestions");
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
                      <label htmlFor="dogHowSoon" className="adoption-form-title">
                        How soon do you want a dog?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="dogHowSoon"
                            name="dogHowSoon"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "dogQuestions");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Immediately">Immediately</option>
                            <option value="Wait">Want to wait for the right one </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="adoption-form-content">
                      <label htmlFor="dogFurtherInfo" className="adoption-form-title">
                        Any further information to help us match a dog to your home and lifestyle?
                      </label>
                      <textarea
                        className="textarea-further-info"
                        autoComplete="off"
                        type="text"
                        id="dogFurtherInfo"
                        name="dogFurtherInfo"
                        placeholder="Enter further information here"
                        onInput={(e) => {
                          handleChange(e, "dogQuestions");
                        }}
                      />
                    </div>
                  </>
                ) : (
                  //* ---------------Cat Questions
                  <>
                    <div className="adoption-form-content">
                      <label htmlFor="catReason" className="adoption-form-title">
                        Do you want a cat for:
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="catReason"
                            name="catReason"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "catQuestions");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Indoors">Indoors</option>
                            <option value="Outdoors">Outdoors</option>
                            <option value="Both">Both</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="adoption-form-content">
                      <label htmlFor="catHomeAlone" className="adoption-form-title">
                        Will your cat be left at home alone?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="catHomeAlone"
                            name="catHomeAlone"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "catQuestions", "catHomeAloneInfo");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {animalForm.current.catQuestions.catHomeAloneInfo.catHomeAlone === "Yes" ? (
                      <>
                        <div className="adoption-form-content">
                          <label htmlFor="catHomeAloneHours" className="adoption-form-title">
                            <span className="subquestion"> Home Alone Question:</span> How many hours per day?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="catHomeAloneHours"
                            name="catHomeAloneHours"
                            placeholder=""
                            onInput={(e) => {
                              handleChange(e, "catQuestions", "catHomeAloneInfo");
                            }}
                          />
                        </div>
                        <div className="adoption-form-content">
                          <label htmlFor="catHomeAloneFrequency" className="adoption-form-title">
                            <span className="subquestion">Home Alone Question:</span> How often?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="catHomeAloneFrequency"
                            name="catHomeAloneFrequency"
                            placeholder="e.g. every day"
                            onInput={(e) => {
                              handleChange(e, "catQuestions", "catHomeAloneInfo");
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="adoption-form-content">
                      <label htmlFor="catSleepLocation" className="adoption-form-title">
                        Where will your cat sleep at night?
                      </label>
                      <input
                        className="animal-form-box"
                        autoComplete="off"
                        type="text"
                        id="catSleepLocation"
                        name="catSleepLocation"
                        placeholder="e.g. In the kitchen"
                        onInput={(e) => {
                          handleChange(e, "catQuestions");
                        }}
                      />
                    </div>

                    <div className="adoption-form-content">
                      <label htmlFor="ownOtherCurrentCats" className="adoption-form-title">
                        Do you own other cats?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="ownOtherCurrentCats"
                            name="ownOtherCurrentCats"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "catQuestions", "ownOtherCatsCurrentInfo");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {animalForm.current.catQuestions.ownOtherCatsCurrentInfo.ownOtherCurrentCats === "Yes" ? (
                      <></>
                    ) : animalForm.current.catQuestions.ownOtherCatsCurrentInfo.ownOtherCurrentCats === "No" ? (
                      <div className="adoption-form-content">
                        <label htmlFor="ownOtherPastCats" className="adoption-form-title">
                          Have you owned a cat before?
                        </label>
                        <div className="filter-dropdown">
                          <div className="dropdown">
                            <select
                              id="ownOtherPastCats"
                              name="ownOtherPastCats"
                              className="dropdown-select"
                              onChange={(e) => {
                                handleChange(e, "catQuestions", "ownOtherCatsPastInfo");
                              }}
                            >
                              <option value="choose">Select…</option>
                              <option value="As Child">As a Child</option>
                              <option value="As Adult">As an Adult</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <> </>
                    )}
                    {animalForm.current.catQuestions.ownOtherCatsPastInfo.ownOtherPastCats === "As Child" ||
                    animalForm.current.catQuestions.ownOtherCatsPastInfo.ownOtherPastCats === "As Adult" ? (
                      <>
                        <div className="adoption-form-content">
                          <label htmlFor="otherPastCatTime" className="adoption-form-title">
                            How long did you have it?
                          </label>
                          <input
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="otherPastCatTime"
                            name="otherPastCatTime"
                            placeholder="e.g. 2 years"
                            onInput={(e) => {
                              handleChange(e, "catQuestions", "ownOtherCatsPastInfo");
                            }}
                          />
                        </div>
                        <div className="adoption-form-content">
                          <label htmlFor="otherCatFate" className="adoption-form-title">
                            What happened to it?
                          </label>
                          <textarea
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="otherCatFate"
                            name="otherCatFate"
                            placeholder="e.g. Died of old age"
                            onInput={(e) => {
                              handleChange(e, "catQuestions", "ownOtherCatsPastInfo");
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="adoption-form-content">
                      <label htmlFor="ownOtherCurrentPets" className="adoption-form-title">
                        Do you own other pets?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="ownOtherCurrentPets"
                            name="ownOtherCurrentPets"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "catQuestions", "ownOtherPetsCurrentInfo");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {animalForm.current.catQuestions.ownOtherPetsCurrentInfo.ownOtherCurrentPets === "Yes" ? (
                      <>
                        <div className="adoption-form-content">
                          <label htmlFor="otherCurrentPetTypes" className="adoption-form-title">
                            What types of pets do you have?
                          </label>
                          <textarea
                            className="animal-form-box"
                            autoComplete="off"
                            type="text"
                            id="otherCurrentPetTypes"
                            name="otherCurrentPetTypes"
                            placeholder="e.g. 2 Cats, Hamster, Snake"
                            onInput={(e) => {
                              handleChange(e, "catQuestions", "ownOtherPetsCurrentInfo");
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="adoption-form-content">
                      <label htmlFor="catAwareOfCostsAndLegal" className="adoption-form-title">
                        Are you fully aware of the costs {animalForm.current.type === "Dog" ? "and legal implications" : ""} of keeping a cat?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="catAwareOfCostsAndLegal"
                            name="catAwareOfCostsAndLegal"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "catQuestions");
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
                      <label htmlFor="catHowSoon" className="adoption-form-title">
                        How soon do you want a cat?
                      </label>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
                            id="catHowSoon"
                            name="catHowSoon"
                            className="dropdown-select"
                            onChange={(e) => {
                              handleChange(e, "catQuestions");
                            }}
                          >
                            <option value="choose">Select…</option>
                            <option value="Immediately">Immediately</option>
                            <option value="Wait">Want to wait for the right one </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="adoption-form-content">
                      <label htmlFor="catFurtherInfo" className="adoption-form-title">
                        Any further information to help us match a cat to your home and lifestyle?
                      </label>
                      <textarea
                        className="textarea-further-info"
                        autoComplete="off"
                        type="text"
                        id="catFurtherInfo"
                        name="catFurtherInfo"
                        placeholder="Enter further information here"
                        onInput={(e) => {
                          handleChange(e, "catQuestions");
                        }}
                      />
                    </div>
                  </>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend>Legal Agreement</legend>
                <ul className="legal-list">
                  <span className="legal-header"> By submitting this form you understand and agree to the following:</span>
                  <li className="legal-list-item">
                    I understand that the {animalForm.current.type} will be rehomed to me as a house pet and is not to be kept closed in a kennel or
                    shed, the {animalForm.current.type} will NOT be chained up outside.
                  </li>
                  <li className="legal-list-item">
                    The {animalForm.current.type} is being rehomed to me as a companion, not as a guard animal or for fighting or breeding purposes
                  </li>
                  <li className="legal-list-item">
                    Bright Eyes Animal Sanctuary will at all times retain ownership of the {animalForm.current.type}, and reserve the right to reclaim
                    it if they feel the {animalForm.current.type} is not being fed, housed or cared for to their satisfaction.
                  </li>
                  <li className="legal-list-item">
                    Should I wish to no longer care for the {animalForm.current.type} I will return it to Bright Eyes Animal Sanctuary. I will not
                    sell, give away or dispose of the {animalForm.current.type} in any other way. The {animalForm.current.type} may only be “Put to
                    Sleep” on the advice of a qualified vet, and Bright Eyes Animal Sanctuary must be notified in Advance.
                  </li>
                  <li className="legal-list-item">
                    I understand that when I'm away on holiday, I will need to place the {animalForm.current.type} in registered kennels or cattery,
                    or arrange for the {animalForm.current.type} to be looked after by a responsible adult.
                  </li>
                  <li className="legal-list-item">
                    I understand that all {animalForm.current.type}'s leaving Bright Eyes Animal Sanctuary must be neutered. Where the{" "}
                    {animalForm.current.type} has been rehomed but is not neutered I agree that I will return the {animalForm.current.type} to be
                    neutered or undertake to ensure that the neutering is carried out by a fully qualified vet.
                  </li>
                  <li className="legal-list-item">
                    I understand that full liability for any veterinary fees, or costs arising from any incident, damages or injury incurred at any
                    future date will be mine and remain mine while I am responsible for the {animalForm.current.type}.
                  </li>
                  <li className="legal-list-item">
                    I understand that although Bright Eyes Animal Sanctuary tells me everything they know about the {animalForm.current.type}, they do
                    not always have a complete history and therefore cannot guarantee behaviour etc.
                  </li>
                  <li className="legal-list-item">
                    I confirm that Bright Eyes Animal Sanctuary may contact my landlord to confirm that my tenancy agreement allows pets.
                  </li>
                  <li className="legal-list-item">
                    I confirm that Bright Eyes Animal Sanctuary may contact my Vet to confirm that I am a responsible owner.
                  </li>
                  <li className="legal-list-item">
                    I understand that I must bring valid photographic I.D. when collecting the {animalForm.current.type} I am rehoming.
                  </li>
                  <li className="legal-list-item">A MINIMUM REHOMING DONATION OF £{animalForm.current.type === "Dog" ? 125 : 30} IS REQUESTED.</li>
                </ul>
              </fieldset>
              <fieldset className="fieldset">
                <legend>How did you hear about Bright Eyes?</legend>
                <div className="adoption-form-content">
                  <label htmlFor="hearAboutUs" className="adoption-form-title">
                    How did you hear about Bright Eyes?
                  </label>
                  <div className="filter-dropdown">
                    <div className="dropdown">
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        className="dropdown-select"
                        onChange={(e) => {
                          handleChange(e, "hearAboutUsInfo");
                        }}
                      >
                        <option value="choose">Select…</option>
                        <option value="From a friend">From a friend</option>
                        <option value="Newspaper">Newspaper</option>
                        <option value="Vet">Vet</option>
                        <option value="I live locally and know theSanctuary">I live locally</option>
                        <option value="Event">Event</option>
                        <option value="Radio">Radio</option>
                        <option value="Facebook">Facebook/Instagram</option>
                        <option value="Web Search (e.g. Google)">Web Search (e.g. Google)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                {animalForm.current.hearAboutUsInfo.hearAboutUs === "Other" ? (
                  <div className="adoption-form-content">
                    <label htmlFor="other" className="adoption-form-title">
                      We'd love to know where you heard of us!
                    </label>
                    <textarea
                      className="textarea-further-info"
                      autoComplete="off"
                      type="text"
                      id="other"
                      name="other"
                      placeholder="It lets us know how to advertise ourselves!"
                      value={animalForm.current.hearAboutUsInfo.other}
                      onInput={(e) => {
                        handleChange(e, "hearAboutUsInfo");
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </fieldset>
              {submittedSuccessfully ? (
                <div className="individual-form-header">Thank you</div>
              ) : loading ? (
                <div className="loading-container">
                  <div className="Loading-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
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

export default FormAdoption;
