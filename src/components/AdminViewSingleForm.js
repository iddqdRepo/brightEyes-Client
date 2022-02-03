import React, { useState, useEffect } from "react";
import { fetchSingleForm } from "../api/apiIndex";
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
    // console.log("form type = ", location.state.detail.type, " form id = ", location.state.detail.id);
    // console.log("fetching form");
    const data = await fetchSingleForm(location.state.detail.type, location.state.detail.id);
    const obj = data.data;
    // console.log("obj ", obj);
    setForm(data.data);
    Object.keys(obj).map((element) => {
      if (element.slice(0, 3) !== "cat") {
        return (dogTemp = { ...dogTemp, [element]: obj[element] });
      }
      if (element.slice(0, 3) !== "dog") {
        return (catTemp = { ...catTemp, [element]: obj[element] });
      }
    });
    setDogForm(dogTemp);
    setCatForm(catTemp);
    // console.log("dogTemp ", dogTemp);
    // console.log("catTemp ", catTemp);
  };

  useEffect(() => {
    getSingleForm();
  }, []);

  const DogCatForm = (props) => {
    //^ Split into component to avoid code duplication
    const topLevelKey = props.topLevelKey;
    const form = props.form;

    //^ If it is a dog form, dont show cat categories */
    return typeof form[topLevelKey] === "object" ? (
      <>
        <fieldset className="fieldset">
          <legend>{topLevelKey}</legend>

          {Object.keys(form[topLevelKey]).map((parentSubcategoryKey) => {
            //^ If it is a Dog subcategory (one object deep)
            return (
              <DogCatFormSubCategory
                key={form.aboutQuestions.name + form.aboutQuestions.postcode + parentSubcategoryKey}
                topLevelKey={topLevelKey}
                form={form}
                parentSubcategoryKey={parentSubcategoryKey}
              />
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
            <div>{form[topLevelKey]}</div>
          </div>
        )}
      </>
    );
  };
  const DogCatFormSubCategory = (props) => {
    const topLevelKey = props.topLevelKey;
    const parentSubcategoryKey = props.parentSubcategoryKey;
    const form = props.form;
    //^ If it is a dog form subcategory */
    return typeof form[topLevelKey][parentSubcategoryKey] === "object" ? (
      Object.keys(form[topLevelKey][parentSubcategoryKey]).map((childSubcategoryKey, index, arr) => {
        //^ If it is a Dog child subcategory (two objects deep)
        return form[topLevelKey][parentSubcategoryKey][childSubcategoryKey].length !== 0 ? (
          <div className="single-form-content" key={titleMap[childSubcategoryKey] + form.aboutQuestions.name + form.aboutQuestions.postcode}>
            {/* //^ childSubcategoryKey is NOT blank */}
            <div className="single-form-title">{titleMap[childSubcategoryKey]}</div>
            {/* {console.log("form[key][formKey][formKeysub].length = ", form[key][formKey][formKeysub].length)} */}
            {console.log(titleMap[topLevelKey] + form.aboutQuestions.name + form.aboutQuestions.postcode)}
            <div>{form[topLevelKey][parentSubcategoryKey][childSubcategoryKey]}</div>
          </div>
        ) : (
          <div key={titleMap[childSubcategoryKey] + form.aboutQuestions.name + form.aboutQuestions.postcode}></div>
        );
      })
    ) : (
      <>
        {/* //^ parentSubcategory is NOT an object, so it's NOT a childSubcategory */}
        <div className="single-form-content">
          <div className="single-form-title">{titleMap[parentSubcategoryKey]}</div>
          <div>{form[topLevelKey][parentSubcategoryKey]}</div>
        </div>
      </>
    );
  };

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
        {form.type === "Dog" || form.type === "Cat"
          ? form.type === "Dog"
            ? //^ If it is a dog form, dont show cat categories */
              Object.keys(dogForm).map((topLevelKey) => {
                return <DogCatForm topLevelKey={topLevelKey} form={dogForm} key={topLevelKey + form.aboutQuestions.name} />;
              })
            : //^ If it is a cat form, dont show dog categories
              Object.keys(catForm).map((topLevelKey) => {
                return <DogCatForm topLevelKey={topLevelKey} form={catForm} key={topLevelKey + form.aboutQuestions.name} />;
              })
          : //^ NOT a Cat Or Dog form (IS volunteer or GiftAid)
            Object.keys(form).map((topLevelKey) => {
              return typeof form[topLevelKey] === "object" ? (
                <fieldset className="fieldset" key={topLevelKey + form.aboutQuestions.name}>
                  <legend>{topLevelKey}</legend>
                  {/* {console.log(topLevelKey + form.aboutQuestions.name)} */}

                  {Object.keys(form[topLevelKey]).map((parentSubcategoryKey, index, arr) => {
                    {
                      /* //^ NOT a Cat Or Dog & topLevelKey IS an object (parentSubcategory) */
                    }
                    return (
                      <div
                        className="single-form-content"
                        key={titleMap[parentSubcategoryKey] + form.aboutQuestions.name + form.aboutQuestions.postcode}
                      >
                        <div className="single-form-title">{titleMap[parentSubcategoryKey]}</div>
                        <div>{form[topLevelKey][parentSubcategoryKey]}</div>
                      </div>
                    );
                  })}
                </fieldset>
              ) : (
                <>
                  {/* //^ NOT a Cat Or Dog & topLevelKey is NOT an object, so it's NOT a parentSubcategory */}

                  {!titleMap[topLevelKey] ? (
                    <div key={titleMap[topLevelKey] + form.aboutQuestions.name + form.aboutQuestions.postcode}></div>
                  ) : (
                    <div className="single-form-content" key={titleMap[topLevelKey] + form.aboutQuestions.name + form.aboutQuestions.postcode}>
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
      </div>
    </div>
  );
}

export default AdminViewSingleForm;
