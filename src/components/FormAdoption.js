import React, { useState } from "react";
import * as api from "../api/apiIndex.js";
import { useLocation } from "react-router-dom";

function FormAdoption() {
  const location = useLocation();
  let animalType = location.state.detail.type;
  const type = "Adoption";
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const [animalForm, setAnimalForm] = useState({
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

  const sendFormEmail = async () => {
    const data = {
      name: animalForm.aboutQuestions.name,
      senderEmail: "",
      message: "",
      type,
    };

    await api.sendMail(data);
  };
  // const handleCheckBox = (e, e, category = "", subcategory = "")

  const handleChange = (e, category = "", subcategory = "") => {
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
    if (subcategory) {
      const chosenCategory = { ...animalForm[category] };
      const chosenSubcategory = { ...chosenCategory[subcategory] };
      chosenSubcategory[key] = value;
      let chosenCategoryTemp = { ...chosenCategory, [subcategory]: chosenSubcategory };
      console.log("chosenCategory ", chosenCategory);
      console.log("chosenSubcategory ", chosenSubcategory);
      console.log("chosenCategoryTemp ", chosenCategoryTemp);
      console.log("key ", key);
      console.log("value ", value);
      setAnimalForm({ ...animalForm, [category]: chosenCategoryTemp });
    } else {
      const chosenCategory = { ...animalForm[category] };
      chosenCategory[key] = value;
      console.log("chosenCategory ", chosenCategory);
      console.log("key ", key);
      console.log("value ", value);
      setAnimalForm({ ...animalForm, [category]: chosenCategory });
    }
  };

  const submitForm = async (e) => {
    console.log("submitform");
    if (Object.values(animalForm.aboutQuestions).some((x) => x === "")) {
      //^If the animal submitted has blank fields
      e.preventDefault();
      setWarningText("Please fill in all fields");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // console.log("Please fill in all fields");
      // console.log(animal);
    } else {
      //^Submit the
      e.preventDefault();
      sendFormEmail();
      setSubmittedSuccessfully(true);
      api.addForm("petAdoption", animalForm);
    }
  };

  //!TODO only reveal estimate dimensions if yes to garden/yard
  return (
    <div className="individual-form-page-container">
      <div className="individual-form-page-content-container">
        <div className="individual-form-header">Application to Re-home a {animalForm.type} from Bright Eyes Animal Sanctuary</div>
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
                  id="title"
                  name="title"
                  value={animalForm.aboutQuestions.title}
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
                  value={animalForm.aboutQuestions.name}
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
                  value={animalForm.aboutQuestions.address}
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
                  value={animalForm.aboutQuestions.postcode}
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
                  value={animalForm.aboutQuestions.phone}
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
                  value={animalForm.aboutQuestions.mobile}
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
                  value={animalForm.aboutQuestions.email}
                  onInput={(e) => {
                    handleChange(e, "aboutQuestions");
                  }}
                />
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend>Matching Questions</legend>
              {animalForm.type === "Dog" ? (
                <>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">If you know the name of the dog, please enter it here.</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="dogName"
                      name="dogName"
                      value={animalForm.dogMatchingQuestions.dogName}
                      onInput={(e) => {
                        handleChange(e, "dogMatchingQuestions");
                      }}
                    />
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What SIZE of dog are you looking for?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
                          name="dogSize"
                          className="dropdown-select"
                          onChange={(e) => {
                            handleChange(e, "dogMatchingQuestions");
                          }}
                        >
                          <option value="choose">Select…</option>
                          <option value="Small">Small (e.g. Terrier)</option>
                          <option value="Medium">Medium (e.g. Collie)</option>
                          <option value="Large">Large (e.g. Labrador)</option>
                          <option value="Any Size">Any Size</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What TYPE of dog are you looking for?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="dogType"
                      name="dogType"
                      value={animalForm.dogMatchingQuestions.dogType}
                      onInput={(e) => {
                        handleChange(e, "dogMatchingQuestions");
                      }}
                    />
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What AGE of dog are you looking for?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
                          name="dogAge"
                          className="dropdown-select"
                          onChange={(e) => {
                            handleChange(e, "dogMatchingQuestions");
                          }}
                        >
                          <option value="choose">Select…</option>
                          <option value="Puppy">Puppy</option>
                          <option value="Less than 2 years">Less than 2 years</option>
                          <option value="2-8 years">2-8 years</option>
                          <option value="8+ years">8+ years</option>
                          <option value="Any age">Any age</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What SEX of dog are you looking for?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
                          name="dogSex"
                          className="dropdown-select"
                          onChange={(e) => {
                            handleChange(e, "dogMatchingQuestions");
                          }}
                        >
                          <option value="choose">Select…</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Either">Either</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">If you know the name of the cat, please enter it here.</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="catName"
                      name="catName"
                      value={animalForm.catMatchingQuestions.catName}
                      onInput={(e) => {
                        handleChange(e, "catMatchingQuestions");
                      }}
                    />
                  </div>

                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What TYPE of cat are you looking for?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
                          name="catType"
                          className="dropdown-select"
                          onChange={(e) => {
                            handleChange(e, "catMatchingQuestions");
                          }}
                        >
                          <option value="choose">Select…</option>
                          <option value="Short Haired">Short Haired</option>
                          <option value="Semi Long Haired">Semi Long Haired</option>
                          <option value="Long Haired">Long Haired</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What AGE of cat are you looking for?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
                          name="catAge"
                          className="dropdown-select"
                          onChange={(e) => {
                            handleChange(e, "catMatchingQuestions");
                          }}
                        >
                          <option value="choose">Select…</option>
                          <option value="Kitten">Kitten</option>
                          <option value="Less than 2 years">Less than 2 years</option>
                          <option value="2-8 years">2-8 years</option>
                          <option value="8+ years">8+ years</option>
                          <option value="Any age">Any age</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What SEX of cat are you looking for?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
                          name="catSex"
                          className="dropdown-select"
                          onChange={(e) => {
                            handleChange(e, "catMatchingQuestions");
                          }}
                        >
                          <option value="choose">Select…</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Either">Either</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">What COLOUR of cat are you looking for?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="catColour"
                      name="catColour"
                      placeholder="e.g. Black"
                      value={animalForm.catMatchingQuestions.catColour}
                      onInput={(e) => {
                        handleChange(e, "catMatchingQuestions");
                      }}
                    />
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">Does anyone in the household have an allergy to cat fur?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
                          name="catAllergy"
                          className="dropdown-select"
                          onChange={(e) => {
                            handleChange(e, "catMatchingQuestions");
                          }}
                        >
                          <option value="choose">Select…</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend>Home Questions</legend>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Your home is a:</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
                      name="homeType"
                      className="dropdown-select"
                      onChange={(e) => {
                        handleChange(e, "homeQuestions");
                      }}
                    >
                      <option value="choose">Select…</option>
                      <option value="House">House</option>
                      <option value="Flat">Flat</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Do you:</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
                      name="rentOrOwn"
                      className="dropdown-select"
                      onChange={(e) => {
                        handleChange(e, "homeQuestions");
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
                <div className="adoption-form-title">Do you live in the:</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
                      name="townOrCountry"
                      className="dropdown-select"
                      onChange={(e) => {
                        handleChange(e, "homeQuestions");
                      }}
                    >
                      <option value="choose">Select…</option>
                      <option value="Town">Town</option>
                      <option value="Country">Country</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Is your home next to a:</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
                      name="nextToRoad"
                      className="dropdown-select"
                      onChange={(e) => {
                        handleChange(e, "homeQuestions");
                      }}
                    >
                      <option value="choose">Select…</option>
                      <option value="Main Road">Main Road</option>
                      <option value="Side Road">Side Road</option>
                      <option value="Neither">Neither</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Do you have a garden or yard?</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
                      name="gardenOrYard"
                      className="dropdown-select"
                      onChange={(e) => {
                        handleChange(e, "homeQuestions");
                      }}
                    >
                      <option value="choose">Select…</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Communal">Communal</option>
                    </select>
                  </div>
                </div>
              </div>
              {animalForm.homeQuestions.gardenOrYard === "Yes" ? (
                <>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">Please estimate the size of your garden/yard</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="gardenOrYardSize"
                      name="gardenOrYardSize"
                      placeholder="e.g. 50ft x 50ft"
                      value={animalForm.homeQuestions.gardenOrYardInfo.gardenOrYardSize}
                      onInput={(e) => {
                        handleChange(e, "homeQuestions", "gardenOrYardInfo");
                      }}
                    />
                  </div>
                  {animalForm.type === "Dog" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">Is your garden/yard fully enclosed?</div>
                        <div className="filter-dropdown">
                          <div className="dropdown">
                            <select
                              name="fullyEnclosed"
                              className="dropdown-select"
                              onChange={(e) => {
                                handleChange(e, "homeQuestions", "gardenOrYardInfo");
                              }}
                            >
                              <option value="choose">Select…</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {animalForm.homeQuestions.gardenOrYardInfo.fullyEnclosed === "Yes" ? (
                        <div className="adoption-form-content">
                          <div className="adoption-form-title">What height is the fence?</div>
                          <div className="filter-dropdown">
                            <div className="dropdown">
                              <select
                                name="fenceHeight"
                                className="dropdown-select"
                                onChange={(e) => {
                                  handleChange(e, "homeQuestions", "gardenOrYardInfo");
                                }}
                              >
                                <option value="choose">Select…</option>
                                <option value="less than 4ft">less than 4ft</option>
                                <option value="4ft-5ft">4ft-5ft</option>
                                <option value="5ft-6ft">5ft-6ft</option>
                                <option value="over 6ft">over 6ft</option>
                              </select>
                            </div>
                          </div>
                        </div>
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

              <div className="adoption-form-content">
                <div className="adoption-form-title">How many adults live at your home?</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="numAdults"
                  name="numAdults"
                  value={animalForm.homeQuestions.numAdults}
                  onInput={(e) => {
                    handleChange(e, "homeQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">How many children live at your home?</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="numChildren"
                  name="numChildren"
                  value={animalForm.homeQuestions.numChildren}
                  onInput={(e) => {
                    handleChange(e, "homeQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Childrens ages</div>
                <textarea
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="childrenAges"
                  name="childrenAges"
                  placeholder="Leave blank if no children."
                  value={animalForm.homeQuestions.childrenAges}
                  onInput={(e) => {
                    handleChange(e, "homeQuestions");
                  }}
                />
              </div>
              <div className="adoption-form-content">
                <div className="adoption-form-title">Do other children visit your home?</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
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
              {animalForm.homeQuestions.otherChildrenVisitInfo.otherChildrenVisit === "Yes" ? (
                <>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">Ages of visiting children?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="otherChildrenAges"
                      name="otherChildrenAges"
                      placeholder="e.g. 7 & 10"
                      value={animalForm.homeQuestions.otherChildrenVisitInfo.otherChildrenAges}
                      onInput={(e) => {
                        handleChange(e, "homeQuestions", "otherChildrenVisitInfo");
                      }}
                    />
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">How often do they visit?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="otherChildrenVisitFrequency"
                      name="otherChildrenVisitFrequency"
                      placeholder="e.g. Once a week?"
                      value={animalForm.homeQuestions.otherChildrenVisitInfo.otherChildrenVisitFrequency}
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
                <div className="adoption-form-title">Are you retired?</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
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
                <div className="">
                  <input type="checkbox" id="baby" name="baby" value="Yes" onClick={(e) => handleChange(e, "homeQuestions", "planning")} />
                  <label htmlFor="scales">A baby</label>
                </div>
                <div>
                  <input type="checkbox" id="moving" name="moving" value="Yes" onClick={(e) => handleChange(e, "homeQuestions", "planning")} />
                  <label htmlFor="horns">Moving house</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="workHoursChange"
                    name="workHoursChange"
                    value="Yes"
                    onClick={(e) => handleChange(e, "homeQuestions", "planning")}
                  />
                  <label htmlFor="horns">A change in work hours</label>
                </div>
                <div>
                  <input type="checkbox" id="holiday" name="holiday" value="Yes" onClick={(e) => handleChange(e, "homeQuestions", "planning")} />
                  <label htmlFor="horns">A holiday (in the next month)</label>
                </div>
              </div>
            </fieldset>

            <fieldset className="fieldset">
              <legend>{animalForm.type} Questions</legend>
              {animalForm.type === "Dog" ? (
                <>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">Do you want a dog for:</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                    <div className="adoption-form-title">Will your dog be left at home alone?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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

                  {animalForm.dogQuestions.dogHomeAloneInfo.dogHomeAlone === "Yes" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">
                          <span className="subquestion"> Home Alone Question:</span> How many hours per day?
                        </div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="number"
                          id="dogHomeAloneHours"
                          name="dogHomeAloneHours"
                          placeholder=""
                          value={animalForm.dogQuestions.dogHomeAloneInfo.dogHomeAloneHours}
                          onInput={(e) => {
                            handleChange(e, "dogQuestions", "dogHomeAloneInfo");
                          }}
                        />
                      </div>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">
                          <span className="subquestion">Home Alone Question:</span> How often?
                        </div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="dogHomeAloneFrequency"
                          name="dogHomeAloneFrequency"
                          placeholder="e.g. every day"
                          value={animalForm.dogQuestions.dogHomeAloneInfo.dogHomeAloneFrequency}
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
                    <div className="adoption-form-title">What type of exercise will your dog receive?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="exerciseType"
                      name="exerciseType"
                      placeholder="e.g. Walking, playing fetch"
                      value={animalForm.dogQuestions.exerciseType}
                      onInput={(e) => {
                        handleChange(e, "dogQuestions");
                      }}
                    />
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">How much daily exercise will you give your dog?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="exerciseTime"
                      name="exerciseTime"
                      placeholder="e.g. 2 Hours"
                      value={animalForm.dogQuestions.exerciseTime}
                      onInput={(e) => {
                        handleChange(e, "dogQuestions");
                      }}
                    />
                  </div>
                  <div className="adoption-form-content">
                    <div className="adoption-form-title">Where will your dog sleep at night?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="dogSleepLocation"
                      name="dogSleepLocation"
                      placeholder="e.g. In the kitchen"
                      value={animalForm.dogQuestions.dogSleepLocation}
                      onInput={(e) => {
                        handleChange(e, "dogQuestions");
                      }}
                    />
                  </div>

                  <div className="adoption-form-content">
                    <div className="adoption-form-title">Do you own other dogs?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                  {animalForm.dogQuestions.ownOtherDogsCurrentInfo.ownOtherCurrentDogs === "Yes" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">
                          <span className="subquestion">Other dogs information:</span> Dog Breeds?
                        </div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="otherCurrentDogBreed"
                          name="otherCurrentDogBreed"
                          placeholder="e.g. Collie"
                          value={animalForm.dogQuestions.ownOtherDogsCurrentInfo.otherCurrentDogBreed}
                          onInput={(e) => {
                            handleChange(e, "dogQuestions", "ownOtherDogsCurrentInfo");
                          }}
                        />
                      </div>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">
                          <span className="subquestion">Other dogs information:</span> Neutered?
                        </div>
                        <div className="filter-dropdown">
                          <div className="dropdown">
                            <select
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
                        <div className="adoption-form-title">
                          <span className="subquestion">Other dogs information:</span> How long have you had them?
                        </div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="otherCurrentDogTime"
                          name="otherCurrentDogTime"
                          placeholder="e.g. 2 years"
                          value={animalForm.dogQuestions.ownOtherDogsCurrentInfo.otherCurrentDogTime}
                          onInput={(e) => {
                            handleChange(e, "dogQuestions", "ownOtherDogsCurrentInfo");
                          }}
                        />
                      </div>
                    </>
                  ) : animalForm.dogQuestions.ownOtherDogsCurrentInfo.ownOtherCurrentDogs === "No" ? (
                    <div className="adoption-form-content">
                      <div className="adoption-form-title">Have you owned a dog before?</div>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
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
                  {animalForm.dogQuestions.ownOtherDogsPastInfo.ownOtherPastDogs === "As Child" ||
                  animalForm.dogQuestions.ownOtherDogsPastInfo.ownOtherPastDogs === "As Adult" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">How long did you have it?</div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="otherPastDogTime"
                          name="otherPastDogTime"
                          placeholder="e.g. 2 years"
                          value={animalForm.dogQuestions.ownOtherDogsPastInfo.otherPastDogTime}
                          onInput={(e) => {
                            handleChange(e, "dogQuestions", "ownOtherDogsPastInfo");
                          }}
                        />
                      </div>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">What happened to it?</div>
                        <textarea
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="otherDogFate"
                          name="otherDogFate"
                          placeholder="e.g. Died of old age"
                          value={animalForm.dogQuestions.ownOtherDogsPastInfo.otherDogFate}
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
                    <div className="adoption-form-title">Do you own other pets?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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

                  {animalForm.dogQuestions.dogOwnOtherPetsCurrentInfo.dogOwnOtherCurrentPets === "Yes" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">What types of pets do you have?</div>
                        <textarea
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="dogOtherCurrentPetTypes"
                          name="dogOtherCurrentPetTypes"
                          placeholder="e.g. 2 Cats, Hamster, Snake"
                          value={animalForm.dogQuestions.dogOwnOtherPetsCurrentInfo.dogOtherCurrentPetTypes}
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
                    <div className="adoption-form-title">Are you fully aware of the costs and legal implications of keeping a dog?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                    <div className="adoption-form-title">How soon do you want a dog?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                    <div className="adoption-form-title">Any further information to help us match a dog to your home and lifestyle?</div>
                    <textarea
                      className="textarea-further-info"
                      autoComplete="off"
                      type="text"
                      id="dogFurtherInfo"
                      name="dogFurtherInfo"
                      placeholder="Enter further information here"
                      value={animalForm.dogQuestions.dogFurtherInfo}
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
                    <div className="adoption-form-title">Do you want a cat for:</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                    <div className="adoption-form-title">Will your cat be left at home alone?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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

                  {animalForm.catQuestions.catHomeAloneInfo.catHomeAlone === "Yes" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">
                          <span className="subquestion"> Home Alone Question:</span> How many hours per day?
                        </div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="number"
                          id="catHomeAloneHours"
                          name="catHomeAloneHours"
                          placeholder=""
                          value={animalForm.catQuestions.catHomeAloneInfo.catHomeAloneHours}
                          onInput={(e) => {
                            handleChange(e, "catQuestions", "catHomeAloneInfo");
                          }}
                        />
                      </div>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">
                          <span className="subquestion">Home Alone Question:</span> How often?
                        </div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="catHomeAloneFrequency"
                          name="catHomeAloneFrequency"
                          placeholder="e.g. every day"
                          value={animalForm.catQuestions.catHomeAloneInfo.catHomeAloneFrequency}
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
                    <div className="adoption-form-title">Where will your cat sleep at night?</div>
                    <input
                      className="animal-form-box"
                      autoComplete="off"
                      type="text"
                      id="catSleepLocation"
                      name="catSleepLocation"
                      placeholder="e.g. In the kitchen"
                      value={animalForm.catQuestions.catSleepLocation}
                      onInput={(e) => {
                        handleChange(e, "catQuestions");
                      }}
                    />
                  </div>

                  <div className="adoption-form-content">
                    <div className="adoption-form-title">Do you own other cats?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                  {animalForm.catQuestions.ownOtherCatsCurrentInfo.ownOtherCurrentCats === "Yes" ? (
                    <></>
                  ) : animalForm.catQuestions.ownOtherCatsCurrentInfo.ownOtherCurrentCats === "No" ? (
                    <div className="adoption-form-content">
                      <div className="adoption-form-title">Have you owned a cat before?</div>
                      <div className="filter-dropdown">
                        <div className="dropdown">
                          <select
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
                  {animalForm.catQuestions.ownOtherCatsPastInfo.ownOtherPastCats === "As Child" ||
                  animalForm.catQuestions.ownOtherCatsPastInfo.ownOtherPastCats === "As Adult" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">How long did you have it?</div>
                        <input
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="otherPastCatTime"
                          name="otherPastCatTime"
                          placeholder="e.g. 2 years"
                          value={animalForm.catQuestions.ownOtherCatsPastInfo.otherPastCatTime}
                          onInput={(e) => {
                            handleChange(e, "catQuestions", "ownOtherCatsPastInfo");
                          }}
                        />
                      </div>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">What happened to it?</div>
                        <textarea
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="otherCatFate"
                          name="otherCatFate"
                          placeholder="e.g. Died of old age"
                          value={animalForm.catQuestions.ownOtherCatsPastInfo.otherCatFate}
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
                    <div className="adoption-form-title">Do you own other pets?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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

                  {animalForm.catQuestions.ownOtherPetsCurrentInfo.ownOtherCurrentPets === "Yes" ? (
                    <>
                      <div className="adoption-form-content">
                        <div className="adoption-form-title">What types of pets do you have?</div>
                        <textarea
                          className="animal-form-box"
                          autoComplete="off"
                          type="text"
                          id="otherCurrentPetTypes"
                          name="otherCurrentPetTypes"
                          placeholder="e.g. 2 Cats, Hamster, Snake"
                          value={animalForm.catQuestions.ownOtherPetsCurrentInfo.otherCurrentPetTypes}
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
                    <div className="adoption-form-title">
                      Are you fully aware of the costs {animalForm.type === "Dog" ? "and legal implications" : ""} of keeping a cat?
                    </div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                    <div className="adoption-form-title">How soon do you want a cat?</div>
                    <div className="filter-dropdown">
                      <div className="dropdown">
                        <select
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
                    <div className="adoption-form-title">Any further information to help us match a cat to your home and lifestyle?</div>
                    <textarea
                      className="textarea-further-info"
                      autoComplete="off"
                      type="text"
                      id="catFurtherInfo"
                      name="catFurtherInfo"
                      placeholder="Enter further information here"
                      value={animalForm.catQuestions.catFurtherInfo}
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
                  I understand that the {animalForm.type} will be rehomed to me as a house pet and is not to be kept closed in a kennel or shed, the{" "}
                  {animalForm.type} will NOT be chained up outside.
                </li>
                <li className="legal-list-item">
                  The {animalForm.type} is being rehomed to me as a companion, not as a guard animal or for fighting or breeding purposes
                </li>
                <li className="legal-list-item">
                  Bright Eyes Animal Sanctuary will at all times retain ownership of the {animalForm.type}, and reserve the right to reclaim it if
                  they feel the {animalForm.type} is not being fed, housed or cared for to their satisfaction.
                </li>
                <li className="legal-list-item">
                  Should I wish to no longer care for the {animalForm.type} I will return it to Bright Eyes Animal Sanctuary. I will not sell, give
                  away or dispose of the {animalForm.type} in any other way. The {animalForm.type} may only be “Put to Sleep” on the advice of a
                  qualified vet, and Bright Eyes Animal Sanctuary must be notified in Advance.
                </li>
                <li className="legal-list-item">
                  I understand that when I'm away on holiday, I will need to place the {animalForm.type} in registered kennels or cattery, or arrange
                  for the {animalForm.type} to be looked after by a responsible adult.
                </li>
                <li className="legal-list-item">
                  I understand that all {animalForm.type}'s leaving Bright Eyes Animal Sanctuary must be neutered. Where the {animalForm.type} has
                  been rehomed but is not neutered I agree that I will return the {animalForm.type} to be neutered or undertake to ensure that the
                  neutering is carried out by a fully qualified vet.
                </li>
                <li className="legal-list-item">
                  I understand that full liability for any veterinary fees, or costs arising from any incident, damages or injury incurred at any
                  future date will be mine and remain mine while I am responsible for the {animalForm.type}.
                </li>
                <li className="legal-list-item">
                  I understand that although Bright Eyes Animal Sanctuary tells me everything they know about the {animalForm.type}, they do not
                  always have a complete history and therefore cannot guarantee behaviour etc.
                </li>
                <li className="legal-list-item">
                  I confirm that Bright Eyes Animal Sanctuary may contact my landlord to confirm that my tenancy agreement allows pets.
                </li>
                <li className="legal-list-item">
                  I confirm that Bright Eyes Animal Sanctuary may contact my Vet to confirm that I am a responsible owner.
                </li>
                <li className="legal-list-item">
                  I understand that I must bring valid photographic I.D. when collecting the {animalForm.type} I am rehoming.
                </li>
                <li className="legal-list-item">A MINIMUM REHOMING DONATION OF £{animalForm.type === "Dog" ? 125 : 30} IS REQUESTED.</li>
              </ul>
            </fieldset>
            <fieldset className="fieldset">
              <legend>How did you hear about Bright Eyes?</legend>
              <div className="adoption-form-content">
                <div className="adoption-form-title">How did you hear about Bright Eyes?</div>
                <div className="filter-dropdown">
                  <div className="dropdown">
                    <select
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
              {animalForm.hearAboutUsInfo.hearAboutUs === "Other" ? (
                <div className="adoption-form-content">
                  <div className="adoption-form-title">We'd love to know where you heard of us!</div>
                  <textarea
                    className="textarea-further-info"
                    autoComplete="off"
                    type="text"
                    id="other"
                    name="other"
                    placeholder="It lets us know how to advertise ourselves!"
                    value={animalForm.hearAboutUsInfo.other}
                    onInput={(e) => {
                      handleChange(e, "hearAboutUsInfo");
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
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
  );
}

export default FormAdoption;
