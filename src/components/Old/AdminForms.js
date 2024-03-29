import React, { useState, useEffect } from "react";
import { fetchForms, deleteForm } from "../../api/apiIndex";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Popup from "reactjs-popup";
import * as api from "../../api/apiIndex";
import { Helmet } from "react-helmet-async";

function AdminForms() {
  const [adoptionForms, setAdoptionForms] = useState("");
  const [dogAdoptionForms, setDogAdoptionForms] = useState("");
  const [catAdoptionForms, setCatAdoptionForms] = useState("");
  const [volunteerForms, setVolunteerForms] = useState("");
  const [giftAidForms, setGiftAidForms] = useState("");
  let navigate = useNavigate();
  let dogAdoption = [];
  let catAdoption = [];
  useEffect(() => {
    getAllForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllForms = async () => {
    console.log("fetching");
    const adoptionData = await fetchForms("petadoption");
    const volunteerData = await fetchForms("volunteer");
    const giftAidData = await fetchForms("giftaid");
    let adoption = adoptionData.data;
    Object.keys(adoption).forEach((key) => {
      if (adoption[key].type === "Dog") {
        console.log("adoption data type = Dog ", adoption[key]);
        dogAdoption.push(adoption[key]);
      } else {
        catAdoption.push(adoption[key]);
      }
    });

    setAdoptionForms(
      adoptionData.data.filter((x) => {
        return x.archive !== "Yes";
      })
    );
    setDogAdoptionForms(
      dogAdoption.filter((x) => {
        return x.archive !== "Yes";
      })
    );
    setCatAdoptionForms(
      catAdoption.filter((x) => {
        return x.archive !== "Yes";
      })
    );
    setVolunteerForms(
      volunteerData.data.filter((x) => {
        return x.archive !== "Yes";
      })
    );
    setGiftAidForms(
      giftAidData.data.filter((x) => {
        return x.archive !== "Yes";
      })
    );
  };

  const onClickDeleteButton = (type, id) => {
    let arrayOfForms;
    console.log("ID passed AdminEditRemove is ", id);
    console.log(`deleting pet with id of ${id}`);
    if (type === "GiftAid") {
      arrayOfForms = [...giftAidForms];
      arrayOfForms.forEach((key, index, arr) => {
        if (key._id === id) {
          arrayOfForms.splice(index, 1);
          deleteForm(type, id);
        }
      });
      setGiftAidForms([...arrayOfForms]);
    } else if (type === "Volunteer") {
      arrayOfForms = [...volunteerForms];
      arrayOfForms.forEach((key, index, arr) => {
        if (key._id === id) {
          arrayOfForms.splice(index, 1);
          deleteForm(type, id);
        }
      });
      setVolunteerForms([...arrayOfForms]);
    } else if (type === "Cat") {
      type = "petAdoption";
      arrayOfForms = [...catAdoptionForms];
      arrayOfForms.forEach((key, index, arr) => {
        if (key._id === id) {
          arrayOfForms.splice(index, 1);
          deleteForm(type, id);
        }
      });
      setCatAdoptionForms([...arrayOfForms]);
    } else if (type === "Dog") {
      type = "petAdoption";
      arrayOfForms = [...dogAdoptionForms];
      arrayOfForms.forEach((key, index, arr) => {
        if (key._id === id) {
          arrayOfForms.splice(index, 1);
          deleteForm(type, id);
        }
      });
      setDogAdoptionForms([...arrayOfForms]);
    } else {
      console.log("ERROR: Type not found");
    }
  };

  const onClickViewButton = (type, id) => {
    if (type === "Cat" || type === "Dog") {
      type = "petAdoption";
      // window.location.reload();
    }
    console.log("ID passed AdminEditSingleForm is ", id);
    console.log("type passed AdminEditSingleForm is ", type);
    navigate(`/admin/viewForm?type=${type}?id=${id}`, {
      state: {
        detail: { type, id },
      },
    });
  };
  const Modal = () => (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      <span> Modal content </span>
    </Popup>
  );

  const onClickArchiveButton = (type, id) => {
    let arrayOfForms;
    if (type === "Cat") {
      type = "petAdoption";
      arrayOfForms = [...catAdoptionForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          key["archive"] = "Yes";
          api.updateForm(type, id, key);
        }
      });
      setCatAdoptionForms([...arrayOfForms]);
    }
    if (type === "Dog") {
      type = "petAdoption";
      arrayOfForms = [...dogAdoptionForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          key["archive"] = "Yes";
          api.updateForm(type, id, key);
        }
      });
      setDogAdoptionForms([...arrayOfForms]);
    }
    if (type === "GiftAid") {
      arrayOfForms = [...giftAidForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          key["archive"] = "Yes";
          api.updateForm(type, id, key);
        }
      });
      setGiftAidForms([...arrayOfForms]);
    }
    if (type === "Volunteer") {
      arrayOfForms = [...volunteerForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          key["archive"] = "Yes";
          api.updateForm(type, id, key);
        }
      });
      setVolunteerForms([...arrayOfForms]);
    }

    // window.location.reload();
  };

  const GenerateFormLayout = (props) => {
    let dataObj = props.data;
    console.log("dataObj = ", dataObj);
    return dataObj.length === 0 ? (
      <>
        <div className="admin-forms-content-container">NO FORMS</div>
      </>
    ) : (
      <div className="admin-forms-content-container">
        {dataObj
          .filter((x) => {
            return x.archive !== "Yes";
          })
          .map((obj) => {
            return (
              <div key={obj._id} className="admin-forms-content">
                <div className="admin-forms-content-left">
                  <div className="admin-forms-name">{obj.aboutQuestions.name}</div>
                </div>
                <div className="admin-forms-content-right">
                  <div className="edit-animal-delete-icon" onClick={() => Modal()}>
                    <Popup
                      trigger={
                        <button className="edit-button tooltip">
                          <span className="tooltiptext">Archive Form</span>

                          <span className="iconify-inline" data-icon="fluent:tray-item-remove-24-filled" data-width="30"></span>
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="modal">
                          <button className="close" onClick={close}></button>
                          <div className="header">
                            Are You Sure You Want To Archive {obj.aboutQuestions.name} {obj.type} form
                          </div>
                          <div className="actions">
                            <button
                              className="button"
                              onClick={() => {
                                onClickArchiveButton(obj.type, obj._id);
                                close();
                              }}
                            >
                              YES
                            </button>
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              NO
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                  <div className="admin-forms-edit-icon ">
                    <button className="edit-button tooltip" onClick={() => onClickViewButton(obj.type, obj._id)}>
                      <span className="tooltiptext">View Form</span>
                      <span className="iconify-inline" data-icon="carbon:view-filled" data-width="30"></span>
                    </button>
                  </div>
                  <div className="admin-forms-delete-icon" onClick={() => Modal()}>
                    <Popup
                      trigger={
                        <button className="edit-button tooltip">
                          <span className="tooltiptext">Delete Form</span>

                          <span className="iconify-inline" data-icon="akar-icons:circle-x-fill" data-width="30"></span>
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="modal">
                          <button className="close" onClick={close}></button>
                          <div className="header">
                            Are You Sure You Want To Delete {obj.aboutQuestions.name} {obj.type} form{" "}
                          </div>
                          <div className="actions">
                            <button
                              className="button"
                              onClick={() => {
                                onClickDeleteButton(obj.type, obj._id);
                                close();
                              }}
                            >
                              YES
                            </button>
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              NO
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Forms</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="admin-forms-page-container">
        <div className="admin-title">SUBMITTED FORMS</div>
        <div className="admin-subtitle">Click on the tabs below to view the forms inside</div>
        <br />
        <br />
        <div className="admin-forms-content-container">
          <Tabs>
            <TabList>
              <Tab> Dog Adoption Forms</Tab>
              <Tab>Cat Adoption Forms</Tab>
              <Tab>GiftAid Forms</Tab>
              <Tab>Volunteer Forms</Tab>
            </TabList>

            <TabPanel>
              {!dogAdoptionForms ? (
                <>
                  <div className="Loading-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </>
              ) : (
                <GenerateFormLayout data={dogAdoptionForms} />
              )}
            </TabPanel>
            <TabPanel>
              {!catAdoptionForms ? (
                <>
                  <div className="Loading-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </>
              ) : (
                <GenerateFormLayout data={catAdoptionForms} />
              )}
            </TabPanel>
            <TabPanel>
              <GenerateFormLayout data={giftAidForms} />
            </TabPanel>
            <TabPanel>
              <GenerateFormLayout data={volunteerForms} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AdminForms;
