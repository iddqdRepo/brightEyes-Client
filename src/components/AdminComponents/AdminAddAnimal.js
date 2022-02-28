import React, { useState } from "react";
import Compress from "react-image-file-resizer";
import * as api from "../../api/apiIndex.js";
import { Helmet } from "react-helmet-async";

function AdminAddAnimal() {
  const [animal, setAnimal] = useState({
    type: "",
    name: "",
    age: "",
    yearsOrMonths: "",
    breed: "",
    size: "",
    image: "",
    suitableForChildren: "",
    suitableForAnimals: "",
    adopted: "No",
    desc: "",
  });

  let animalCapitalized = {};

  const [fileUploaded, setFileUploaded] = useState("");
  const [warningText, setWarningText] = useState("");

  const submitAnimal = async (e) => {
    if (Object.values(animal).some((x) => x === "")) {
      //^If the animal submitted has blank fields
      e.preventDefault();
      setWarningText("Please fill in all fields");
      console.log("Please fill in all fields");
      window.scrollTo({ top: 0, behavior: "smooth" });
      // console.log(animal);
    } else {
      //^Submit the
      e.preventDefault();
      console.log(animal);
      await capitalize(animal);
      console.log("animalCapitalized = ", animalCapitalized);
      api.addPets(animalCapitalized);
      window.location.reload();
    }
  };

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
      toCapitalize.name = toCapitalize.name.charAt(0).toUpperCase() + toCapitalize.name.slice(1);
      toCapitalize.breed = toCapitalize.breed.charAt(0).toUpperCase() + toCapitalize.breed.slice(1);
      toCapitalize.desc = toCapitalize.desc.charAt(0).toUpperCase() + toCapitalize.desc.slice(1);
      animalCapitalized = toCapitalize;
      resolve(animalCapitalized);
    });
  };

  const handleChange = (e) => {
    console.log(animal);
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

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Admin add a new animal, Bright Eyes." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="/admin" />
      </Helmet>

      <div className="add-animal-page-container">
        <div className="admin-title">ADD ANIMAL</div>
        <div className="admin-subtitle">
          When submitted, the animal will appear instantly on the website in the "adoption tab". <br />
          (if you have the page open, refresh it if animal does not show)
        </div>

        {warningText ? <div className="admin-warning">Please Fill in all fields</div> : <div> </div>}

        <form onSubmit={(e) => submitAnimal(e)}>
          <div className="add-animal-content-container">
            <div className="add-animal-content">
              <label htmlFor="type" className="add-animal-title">
                Type:
              </label>
              <div className="filter-dropdown">
                <div className="dropdown">
                  <select
                    id="type"
                    name="type"
                    className="dropdown-select"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="choose">Select…</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="add-animal-content">
              <label htmlFor="name" className="add-animal-title">
                Name:
              </label>
              <input
                className="animal-form-box"
                autoComplete="off"
                type="text"
                id="name"
                name="name"
                value={animal.name}
                onInput={(e) => {
                  handleChange(e); //copy person from the state, then get name from object and change it
                }}
              />
            </div>
            <div className="add-animal-content">
              <label htmlFor="age" className="add-animal-title">
                Age:
              </label>
              <div className="add-animal-form-dropdown-age-container">
                <input
                  className="animal-form-box animal-form-age"
                  autoComplete="off"
                  type="number"
                  id="age"
                  name="age"
                  value={animal.age}
                  onInput={(e) => {
                    handleChange(e); //copy person from the state, then get name from object and change it
                  }}
                />
                <div className="filter-dropdown age">
                  <div className="dropdown-age">
                    <select
                      id="yearsOrMonths"
                      name="yearsOrMonths"
                      className="dropdown-age-select"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option value="choose">Select…</option>
                      <option value="Months">Months</option>
                      <option value="Years">Years</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="add-animal-content">
              <label htmlFor="breed" className="add-animal-title">
                Breed:
              </label>
              <input
                className="animal-form-box"
                autoComplete="off"
                type="text"
                id="breed"
                name="breed"
                value={animal.breed}
                onInput={(e) => {
                  handleChange(e); //copy person from the state, then get name from object and change it
                }}
              />
            </div>
            <div className="add-animal-content">
              <label htmlFor="size" className="add-animal-title">
                Size:
              </label>
              <div className="filter-dropdown">
                <div className="dropdown">
                  <select
                    id="size"
                    name="size"
                    className="dropdown-select"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="choose">Select…</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Giant">Giant</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="add-animal-content">
              <label htmlFor="suitableForChildren" className="add-animal-title">
                Suitable for children:
              </label>
              <div className="filter-dropdown">
                <div className="dropdown">
                  <select
                    id="suitableForChildren"
                    name="suitableForChildren"
                    className="dropdown-select"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="choose">Select…</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="add-animal-content">
              <label htmlFor="suitableForAnimals" className="add-animal-title">
                Suitable for animals:
              </label>
              <div className="filter-dropdown">
                <div className="dropdown">
                  <select
                    id="suitableForAnimals"
                    name="suitableForAnimals"
                    className="dropdown-select"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="choose">Select…</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="add-animal-content">
              <label htmlFor="adopted" className="add-animal-title">
                Adopted:
              </label>
              <div className="filter-dropdown">
                <div className="dropdown">
                  <select
                    id="adopted"
                    name="adopted"
                    className="dropdown-select"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="choose">Select…</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="add-animal-content">
              <label htmlFor="file" className="add-animal-title">
                Animal Image
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                name="image"
                // value={animal.image}
                onChange={(e) => {
                  // onFileResize(e);
                  handleChange(e);
                  // uploadImage(e);
                }}
              />
            </div>
            {fileUploaded ? <img src={fileUploaded} alt="Animal Uploaded" height="200px" width="200px" /> : <div> No File Chosen </div>}

            <div className="add-animal-content">
              <label htmlFor="desc" className="add-animal-title">
                Description:
              </label>
              <textarea
                className="animal-text-area"
                autoComplete="off"
                type="text"
                id="desc"
                name="desc"
                value={animal.desc}
                onInput={(e) => {
                  handleChange(e); //copy person from the state, then get name from object and change it
                }}
              />
            </div>

            <button type="submit" className="button add-animal-button">
              Add Animal
            </button>
          </div>
        </form>
        {/* <button className="button add-animal-button" onClick={() => console.log(animal)}></button> */}
      </div>
    </>
  );
}

export default AdminAddAnimal;
