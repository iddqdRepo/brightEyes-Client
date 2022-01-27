import React, { useState, useEffect } from "react";
import { fetchSinglePet, updatePet } from "../api/apiIndex";
import Compress from "react-image-file-resizer";
import { useNavigate, useLocation } from "react-router-dom";
function AdminEditSingleAnimal() {
  const [warningText, setWarningText] = useState("");
  const [animal, setAnimal] = useState("");
  const [fileUploaded, setFileUploaded] = useState("");

  const location = useLocation();
  let navigate = useNavigate();
  let animalCapitalized = {};

  const getSinglePet = async () => {
    console.log("animalID ", location.state.detail.id);
    console.log("fetching pet");
    const data = await fetchSinglePet(location.state.detail.id);
    setAnimal(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    getSinglePet();
  }, []);

  let onFileResize = (e) => {
    //^compress the file then store in base64
    return new Promise((resolve, reject) => {
      //^ Wait until the image is compressed before storing
      console.log(e.target.files[0]);
      const file = e.target.files[0];

      Compress.imageFileResizer(
        file, // the file from input
        480, // width
        480, // height
        "JPEG", // compress format WEBP, JPEG, PNG
        70, // quality
        0, // rotation
        (uri) => {
          // console.log(uri);
          // var stringLength = uri.length - "data:image/png;base64,".length;
          // var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
          // var sizeInMb = sizeInBytes / 1000000;
          // console.log(sizeInMb + "MB");
          setFileUploaded(uri);
          resolve(uri);
        },
        "base64" // blob or base64 default base64
      );
    });
  };

  const capitalize = (obj) => {
    return new Promise((resolve, reject) => {
      let toCapitalize = obj;

      toCapitalize.map((e) => {
        console.log(e);
        console.log(e.name);
        console.log(e.age);
        console.log(e.breed);

        e.name = e.name.charAt(0).toUpperCase() + e.name.slice(1);
        e.breed = e.breed.charAt(0).toUpperCase() + e.breed.slice(1);
        e.desc = e.desc.charAt(0).toUpperCase() + e.desc.slice(1);
      });
      console.log("toCapitalize", toCapitalize[0]);
      // setAnimalCapitalized({ ...animalCapitalized, toCapitalize });
      animalCapitalized = toCapitalize[0];
      resolve(animalCapitalized);
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = "";
    if (name === "image") {
      //^ If the on change detects it's an image upload
      //^ Wait until the image is compressed before storing
      onFileResize(e).then(function (uri) {
        value = uri;
        setAnimal({ ...animal, [name]: value });
      });
    } else {
      value = e.target.value;
      setAnimal({ ...animal, [name]: value });
    }
  };

  const submitAnimal = async (e) => {
    if (Object.values(animal).some((x) => x === "")) {
      //^If the animal submitted has blank fields
      e.preventDefault();
      setWarningText("Please fill in all fields");
      console.log("Please fill in all fields");
      console.log(animal);
    } else {
      //^Submit the
      e.preventDefault();
      console.log(animal);
      await capitalize([animal]);
      console.log("animalCapitalized = ", animalCapitalized);
      // api.addPets(animalCapitalized);
      await updatePet(location.state.detail.id, animal);
      navigate(`/admin/edit`);
    }
  };

  return !animal ? (
    <div className="add-animal-page-container">
      <div className="admin-title">EDIT ANIMAL</div>
      <div className="edit-animal-content-container">
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
    <div className="add-animal-page-container">
      <div className="admin-title">EDIT ANIMAL</div>
      <div className="admin-subtitle">Editing</div>
      {warningText ? <div className="admin-warning">Please Fill in all fields</div> : <div> </div>}

      <form onSubmit={(e) => submitAnimal(e)}>
        <div className="add-animal-content-container">
          {animal.image ? <img src={animal.image} height="200px" width="200px" /> : <div> No File Chosen </div>}
          <div className="add-animal-content">
            <div className="add-animal-title">Type:</div>
            <div className="filter-dropdown">
              <div className="dropdown">
                <select
                  name="type"
                  className="dropdown-select"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {animal.type === "Dog" ? (
                    <>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </>
                  ) : (
                    <>
                      <option value="Cat">Cat</option>
                      <option value="Dog">Dog</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="add-animal-content">
            <div className="add-animal-title">Name:</div>
            <input
              className="animal-form-box"
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              defaultValue={animal.name}
              onInput={(e) => {
                handleChange(e); //copy person from the state, then get name from object and change it
              }}
            />
          </div>
          <div className="add-animal-content">
            <div className="add-animal-title">Age:</div>
            <div className="add-animal-form-dropdown-age-container">
              <input
                className="animal-form-box animal-form-age"
                autoComplete="off"
                type="number"
                id="age"
                name="age"
                defaultValue={animal.age}
                onInput={(e) => {
                  handleChange(e); //copy person from the state, then get name from object and change it
                }}
              />
              <div className="filter-dropdown age">
                <div className="dropdown-age">
                  <select
                    name="yearsOrMonths"
                    className="dropdown-age-select"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {animal.yearsOrMonths === "Months" ? (
                      <>
                        <option value="Months">Months</option>
                        <option value="Years">Years</option>
                      </>
                    ) : (
                      <>
                        <option value="Years">Years</option>
                        <option value="Months">Months</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="add-animal-content">
            <div className="add-animal-title">Breed:</div>
            <input
              className="animal-form-box"
              autoComplete="off"
              type="text"
              id="breed"
              name="breed"
              defaultValue={animal.breed}
              onInput={(e) => {
                handleChange(e); //copy person from the state, then get name from object and change it
              }}
            />
          </div>
          <div className="add-animal-content">
            <div className="add-animal-title">Size:</div>
            <div className="filter-dropdown">
              <div className="dropdown">
                <select
                  name="size"
                  className="dropdown-select"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {animal.size === "Small" && (
                    <>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Giant">Giant</option>
                    </>
                  )}
                  {animal.size === "Medium" && (
                    <>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Giant">Giant</option>
                    </>
                  )}
                  {animal.size === "Large" && (
                    <>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Giant">Giant</option>
                    </>
                  )}
                  {animal.size === "Giant" && (
                    <>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Giant">Giant</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="add-animal-content">
            <div className="add-animal-title">Suitable for children:</div>
            <div className="filter-dropdown">
              <div className="dropdown">
                <select
                  name="suitableForChildren"
                  className="dropdown-select"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {animal.suitableForChildren === "Yes" ? (
                    <>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </>
                  ) : (
                    <>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="add-animal-content">
            <div className="add-animal-title">Suitable for animals:</div>
            <div className="filter-dropdown">
              <div className="dropdown">
                <select
                  name="suitableForAnimals"
                  className="dropdown-select"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {animal.suitableForAnimals === "Yes" ? (
                    <>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </>
                  ) : (
                    <>
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="add-animal-content">
            <div className="add-animal-title">Adopted:</div>
            <div className="filter-dropdown">
              <div className="dropdown">
                <select
                  name="adopted"
                  className="dropdown-select"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {animal.adopted === "yes" ? (
                    <>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </>
                  ) : (
                    <>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="add-animal-content">
            <div className="add-animal-title">Change Image</div>
            <input
              type="file"
              id="file"
              accept="image/*"
              name="image"
              onChange={(e) => {
                // onFileResize(e);
                handleChange(e);
                // uploadImage(e);
              }}
            />
          </div>
          {fileUploaded ? <img src={fileUploaded} height="200px" width="200px" /> : <div> No File Chosen </div>}

          <div className="add-animal-content">
            <div className="add-animal-title">Description:</div>
            <textarea
              className="animal-text-area"
              autoComplete="off"
              type="text"
              id="desc"
              name="desc"
              defaultValue={animal.desc}
              onInput={(e) => {
                handleChange(e); //copy person from the state, then get name from object and change it
              }}
            />
          </div>

          <button type="submit" className="button add-animal-button">
            Update
          </button>
          <button className="button add-animal-button">Cancel</button>
        </div>
      </form>
      {/* <button className="button add-animal-button" onClick={() => console.log(animal)}></button> */}
    </div>
  );
}

export default AdminEditSingleAnimal;
