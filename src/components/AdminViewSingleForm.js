import React, { useState, useEffect } from "react";
import { fetchSingleForm, updateForm } from "../api/apiIndex";
import { useLocation } from "react-router-dom";
import titleMap from "../mappingTitles";
function AdminViewSingleForm() {
  const [form, setForm] = useState("");
  const [dogForm, setDogForm] = useState("");
  const [catForm, setCatForm] = useState("");
  let dogTemp;
  let catTemp;

  const location = useLocation();

  const getSingleForm = async () => {
    console.log("form type = ", location.state.detail.type, " form id = ", location.state.detail.id);
    console.log("fetching form");
    const data = await fetchSingleForm(location.state.detail.type, location.state.detail.id);
    const obj = data.data;
    console.log("obj ", obj);
    setForm(data.data);
    Object.keys(obj).map((element) => {
      if (element.slice(0, 3) !== "cat") {
        dogTemp = { ...dogTemp, [element]: obj[element] };
      }
      if (element.slice(0, 3) !== "dog") {
        catTemp = { ...catTemp, [element]: obj[element] };
      }
    });
    setDogForm(dogTemp);
    setCatForm(catTemp);
    console.log("dogTemp ", dogTemp);
    console.log("catTemp ", catTemp);
  };

  useEffect(() => {
    getSingleForm();
  }, []);

  //TODO Form ID title not showing on dog/cat form & giftAid questions below main form ( giftAidFuture, giftAidPast)
  return !form ? (
    <div className="single-form-page-container">
      <div className="admin-title">VIEW FORM</div>
      <div className="single-form-content-container">
        <>
          <div className="Loading-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      </div>
    </div>
  ) : (
    <div className="single-form-page-container">
      <div className="admin-title">VIEW FORM</div>
      <div className="admin-subtitle">
        Viewing {form.type} form for {form.aboutQuestions.name}
      </div>
      <div className="single-form-content-container">
        {form.type === "Dog" || form.type === "Cat" ? (
          <>
            {form.type === "Dog" ? (
              <>
                {Object.keys(dogForm).map((topLevelKey) => {
                  {
                    /* //^ If it is a dog form, dont show cat categories */
                  }
                  return typeof dogForm[topLevelKey] === "object" ? (
                    <>
                      <fieldset className="fieldset">
                        <legend>{topLevelKey}</legend>

                        {Object.keys(dogForm[topLevelKey]).map((parentSubcategoryKey) => {
                          //^ If it is a Dog/Cat subcategory (one object deep)
                          return typeof dogForm[topLevelKey][parentSubcategoryKey] === "object" ? (
                            Object.keys(dogForm[topLevelKey][parentSubcategoryKey]).map((childSubcategoryKey, index, arr) => {
                              //^ If it is a Dog/Cat child subcategory (two objects deep)
                              return dogForm[topLevelKey][parentSubcategoryKey][childSubcategoryKey].length !== 0 ? (
                                <>
                                  {/* //^ childSubcategoryKey is NOT blank */}
                                  <div className="single-form-content">
                                    <div className="single-form-title">{titleMap[childSubcategoryKey]}</div>
                                    {/* {console.log("form[key][formKey][formKeysub].length = ", form[key][formKey][formKeysub].length)} */}
                                    <div>{dogForm[topLevelKey][parentSubcategoryKey][childSubcategoryKey]}</div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* //^ childSubcategoryKey is blank */}
                                  {console.log(childSubcategoryKey, "is BLANK")}
                                </>
                              );
                            })
                          ) : (
                            <>
                              {/* //^ parentSubcategory is NOT an object, so it's NOT a childSubcategory */}
                              <div className="single-form-content">
                                <div className="single-form-title">{titleMap[parentSubcategoryKey]}</div>
                                <div>{dogForm[topLevelKey][parentSubcategoryKey]}</div>
                              </div>
                            </>
                          );
                        })}
                      </fieldset>
                    </>
                  ) : (
                    <>
                      {/* //^ topLevelKey is NOT an object, so it's NOT a parentSubcategory */}
                      {!titleMap[topLevelKey] ? (
                        <></>
                      ) : (
                        <div className="single-form-content">
                          <div className="single-form-title">{titleMap[topLevelKey]}</div>
                          <div>{dogForm[topLevelKey]}</div>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {Object.keys(catForm).map((topLevelKey) => {
                  {
                    /* //^ If it is a cat form, dont show dog categories */
                  }
                  return typeof catForm[topLevelKey] === "object" ? (
                    <>
                      <fieldset className="fieldset">
                        <legend>{topLevelKey}</legend>
                        {Object.keys(catForm[topLevelKey]).map((parentSubcategoryKey) => {
                          //^ If it is a Dog/Cat subcategory (one object deep)
                          return typeof catForm[topLevelKey][parentSubcategoryKey] === "object" ? (
                            Object.keys(catForm[topLevelKey][parentSubcategoryKey]).map((childSubcategoryKey, index, arr) => {
                              //^ If it is a Dog/Cat child subcategory (two objects deep)
                              return catForm[topLevelKey][parentSubcategoryKey][childSubcategoryKey].length !== 0 ? (
                                <>
                                  {/* //^ childSubcategoryKey is NOT blank */}
                                  <div className="single-form-content">
                                    <div className="single-form-title">{titleMap[childSubcategoryKey]}</div>
                                    {/* {console.log("form[key][formKey][formKeysub].length = ", form[key][formKey][formKeysub].length)} */}
                                    <div>{catForm[topLevelKey][parentSubcategoryKey][childSubcategoryKey]}</div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* //^ childSubcategoryKey is blank */}
                                  {console.log(childSubcategoryKey, "is BLANK")}
                                </>
                              );
                            })
                          ) : (
                            <>
                              {/* //^ parentSubcategory is NOT an object, so it's NOT a childSubcategory */}
                              <div className="single-form-content">
                                <div className="single-form-title">{titleMap[parentSubcategoryKey]}</div>
                                <div>{catForm[topLevelKey][parentSubcategoryKey]}</div>
                              </div>
                            </>
                          );
                        })}
                      </fieldset>
                    </>
                  ) : (
                    <>
                      {/* //^ topLevelKey is NOT an object, so it's NOT a parentSubcategory */}
                      {!titleMap[topLevelKey] ? (
                        <></>
                      ) : (
                        <div className="single-form-content">
                          <div className="single-form-title">{titleMap[topLevelKey]}</div>
                          <div>{catForm[topLevelKey]}</div>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {Object.keys(form).map((topLevelKey) => {
              {
                /* //^ NOT a Cat Or Dog form (IS volunteer or GiftAid)*/
              }

              return typeof form[topLevelKey] === "object" ? (
                <>
                  <fieldset className="fieldset">
                    <legend>{topLevelKey}</legend>

                    {Object.keys(form[topLevelKey]).map((parentSubcategoryKey, index, arr) => {
                      {
                        /* //^ NOT a Cat Or Dog & topLevelKey IS an object (parentSubcategory) */
                      }
                      return (
                        <div className="single-form-content">
                          <div className="single-form-title">{titleMap[parentSubcategoryKey]}</div>
                          {console.log("subcategory ", parentSubcategoryKey, ": ", form[topLevelKey][parentSubcategoryKey])}
                          <div>{form[topLevelKey][parentSubcategoryKey]}</div>
                        </div>
                      );
                    })}
                  </fieldset>
                </>
              ) : (
                <>
                  {/* //^ NOT a Cat Or Dog & topLevelKey is NOT an object, so it's NOT a parentSubcategory */}

                  {!titleMap[topLevelKey] ? (
                    <></>
                  ) : (
                    <div className="single-form-content">
                      <div className="single-form-title">{titleMap[topLevelKey]}</div>
                      <div>{form[topLevelKey]}</div>
                    </div>
                  )}

                  {/* <div className="single-form-content">
                    <div className="single-form-title">{titleMap[topLevelKey]}</div>
                    <div>{form[topLevelKey]}</div>
                  </div> */}
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminViewSingleForm;
