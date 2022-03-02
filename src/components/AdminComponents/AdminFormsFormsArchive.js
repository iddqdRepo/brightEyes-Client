import React, { useState, useEffect } from "react";
import { fetchForms, deleteForm } from "../../api/apiIndex";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Popup from "reactjs-popup";
import * as api from "../../api/apiIndex";
import { Helmet } from "react-helmet-async";

function AdminFormsFormsArchive(props) {
  const [dogAdoptionForms, setDogAdoptionForms] = useState("");
  const [catAdoptionForms, setCatAdoptionForms] = useState("");
  const [volunteerForms, setVolunteerForms] = useState("");
  const [giftAidForms, setGiftAidForms] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let navigate = useNavigate();
  let dogAdoption = [];
  let catAdoption = [];
  useEffect(() => {
    setIsLoading(true);
    getAllForms();
  }, [props]);

  const getAllForms = async () => {
    const adoptionData = await fetchForms("petadoption");
    const volunteerData = await fetchForms("volunteer");
    const giftAidData = await fetchForms("giftaid");
    let adoption = adoptionData.data;
    Object.keys(adoption).forEach((key) => {
      if (adoption[key].type === "Dog") {
        console.log("adoption data type = Dog ", adoption[key]);
        dogAdoption.push(adoption[key]);
      } else {
        console.log("adoption data type = Cat ", adoption[key]);
        catAdoption.push(adoption[key]);
      }
    });

    if (props.type === "archive") {
      setDogAdoptionForms(
        dogAdoption.filter((x) => {
          return x.archive === "Yes";
        })
      );
      setCatAdoptionForms(
        catAdoption.filter((x) => {
          return x.archive === "Yes";
        })
      );
      setVolunteerForms(
        volunteerData.data.filter((x) => {
          return x.archive === "Yes";
        })
      );
      setGiftAidForms(
        giftAidData.data.filter((x) => {
          return x.archive === "Yes";
        })
      );
    } else {
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
    }
    setIsLoading(false);
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

  const onClickArchiveButton = (type, id, archiveOrUnarchive) => {
    let arrayOfForms;

    if (type === "Cat") {
      type = "petAdoption";
      arrayOfForms = [...catAdoptionForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          archiveOrUnarchive === "archive" ? (key["archive"] = "Yes") : (key["archive"] = "No");
          api.updateForm(type, id, key);
        }
      });
      setCatAdoptionForms([...arrayOfForms]);
      window.location.reload();
    }
    if (type === "Dog") {
      type = "petAdoption";
      arrayOfForms = [...dogAdoptionForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          archiveOrUnarchive === "archive" ? (key["archive"] = "Yes") : (key["archive"] = "No");
          api.updateForm(type, id, key);
        }
      });
      setDogAdoptionForms([...arrayOfForms]);
      window.location.reload();
    }
    if (type === "GiftAid") {
      arrayOfForms = [...giftAidForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          archiveOrUnarchive === "archive" ? (key["archive"] = "Yes") : (key["archive"] = "No");
          api.updateForm(type, id, key);
        }
      });
      setGiftAidForms([...arrayOfForms]);
      window.location.reload();
    }
    if (type === "Volunteer") {
      arrayOfForms = [...volunteerForms];
      arrayOfForms.forEach((key) => {
        console.log("key = ", key._id);
        if (key._id === id) {
          archiveOrUnarchive === "archive" ? (key["archive"] = "Yes") : (key["archive"] = "No");
          api.updateForm(type, id, key);
        }
      });
      setVolunteerForms([...arrayOfForms]);
      window.location.reload();
    }
  };

  const Loading = () => {
    return (
      <>
        <div className="Loading-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    );
  };
  const GenerateFormLayout = (props) => {
    let dataObj = props.data;
    return dataObj.length === 0 ? (
      <>
        <div className="admin-forms-content-container">NO FORMS</div>
      </>
    ) : (
      <div className="admin-forms-content-container">
        {dataObj.map((form) => {
          return (
            <div key={form._id} className="admin-forms-content">
              {console.log("form = ", form)}
              <div className="admin-forms-content-left">
                <div className="admin-forms-name">{form.aboutQuestions.name}</div>
              </div>
              <div className="admin-forms-content-right">
                <div className="edit-animal-delete-icon" onClick={() => Modal()}>
                  <Popup
                    trigger={
                      <button className="edit-button tooltip">
                        {props.type === "archive" ? (
                          <span className="tooltiptext">UNArchive Form</span>
                        ) : (
                          <span className="tooltiptext">Archive Form</span>
                        )}
                        <span className="iconify-inline" data-icon="fluent:tray-item-remove-24-filled" data-width="30"></span>
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal">
                        <button className="close" onClick={close}></button>
                        {props.type === "archive" ? (
                          <div className="header">
                            Are You Sure You Want To UNarchive {form.aboutQuestions.name} {form.type} form
                          </div>
                        ) : (
                          <div className="header">
                            Are You Sure You Want To Archive {form.aboutQuestions.name} {form.type} form
                          </div>
                        )}

                        <div className="actions">
                          {props.type === "archive" ? (
                            <button
                              className="button"
                              onClick={() => {
                                onClickArchiveButton(form.type, form._id, "unarchive");
                                close();
                              }}
                            >
                              YES
                            </button>
                          ) : (
                            <button
                              className="button"
                              onClick={() => {
                                onClickArchiveButton(form.type, form._id, "archive");
                                close();
                              }}
                            >
                              YES
                            </button>
                          )}

                          <button
                            className="button"
                            onClick={() => {
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
                  <button className="edit-button tooltip" onClick={() => onClickViewButton(form.type, form._id)}>
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
                          Are You Sure You Want To Delete {form.aboutQuestions.name} {form.type} form
                        </div>
                        <div className="actions">
                          <button
                            className="button"
                            onClick={() => {
                              onClickDeleteButton(form.type, form._id);
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
        {props.type === "archive" ? <div className="admin-title">ARCHIVED FORMS </div> : <div className="admin-title">SUBMITTED FORMS </div>}
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
            <TabPanel>{isLoading ? <Loading /> : <GenerateFormLayout data={dogAdoptionForms} type={props.type} />}</TabPanel>
            <TabPanel>{isLoading ? <Loading /> : <GenerateFormLayout data={catAdoptionForms} type={props.type} />}</TabPanel>
            <TabPanel>{isLoading ? <Loading /> : <GenerateFormLayout data={giftAidForms} type={props.type} />}</TabPanel>
            <TabPanel>{isLoading ? <Loading /> : <GenerateFormLayout data={volunteerForms} type={props.type} />}</TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default AdminFormsFormsArchive;
