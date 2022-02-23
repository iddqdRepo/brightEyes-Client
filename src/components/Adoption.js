import React, { useState, useEffect } from "react";
import * as api from "../api/apiIndex";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DonateSlantedComponent from "./DonateSlantedComponent";

function Adoption() {
  let navigate = useNavigate();
  const [animals, setAnimals] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState("");

  useEffect(() => {
    const getAllAnimals = async () => {
      const data = await api.fetchPets();
      // console.log(data);
      setAnimals(
        data.data.filter((animal) => {
          return animal.adopted === "No";
        })
      );
      setFilteredAnimals((animal) => {
        return animal.adopted === "No";
      });
    };
    getAllAnimals();
  }, []);

  const handleViewBio = (id) => {
    navigate(`/adoption/viewBio?id=${id}`, {
      state: {
        detail: { id },
      },
    });
  };

  return (
    <>
      <div className="adoption-container">
        <div className="adoption-header">Adoption Criteria</div>
        <div className="adoption-subtext">
          There are certain criteria that need to be met in order to adopt a pet from Bright Eyes, please make sure you meet the criteria before
          submitting your application.
        </div>

        <div className="adoption-split-content">
          <div className="adoption-split-points-left-container">
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="bi:check-circle"></span>
              <span className="adoption-point-text"> Enclosed Garden </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="bi:check-circle"></span>
              <span className="adoption-point-text"> Sleeping Indoors </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="bi:check-circle"></span>
              <span className="adoption-point-text"> Landlord Permission </span>
            </div>
          </div>

          <div className="adoption-split-points-right-container">
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="bi:check-circle"></span>
              <span className="adoption-point-text"> Children 12+ </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="bi:check-circle"></span>
              <span className="adoption-point-text"> Compulsory Home Check </span>
            </div>
            <div className="adoption-point-container">
              <span className="iconify-inline" data-icon="bi:check-circle"></span>
              <span className="adoption-point-text"> Form Required </span>
            </div>
          </div>
        </div>
        <Link to="/forms">
          <button type="button" className="button adoption-form-button">
            Adoption Form
          </button>
        </Link>

        <div className="slanted-div-filter">
          <div className="slanted-div-filter-content-container">
            <div className="slanted-div-left-filter-text-container">
              <span className="filter-header">Filter</span> <br />
              <br />
              <div className="filter-dropdown">
                <div className="dropdown">
                  <select
                    name="one"
                    className="dropdown-select"
                    onChange={(e) => {
                      setFilteredAnimals(e.target.value);
                    }}
                  >
                    <option value="all">All</option>
                    <option value="Dog">Dogs</option>
                    <option value="Cat">Cats</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pet-viewer-content-container">
          {!animals ? (
            <>
              <div className="Loading-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </>
          ) : (
            animals
              .filter((val) => {
                if (filteredAnimals === "Dog") {
                  return val.type === "Dog";
                } else if (filteredAnimals === "Cat") {
                  return val.type === "Cat";
                } else {
                  return val;
                }
              })
              .map((key) => {
                return (
                  <div data-testid="AnimalContainer" className="pet-container" key={key.name + key.age}>
                    <div
                      className="pet-image"
                      style={{
                        backgroundImage: `url("${key.image}")`,
                      }}
                    ></div>
                    <div className="pet-age-weight">
                      <div className="pet-weight">
                        <span className="iconify-inline" data-icon="ion:scale-sharp"></span>
                        &nbsp;{key.size}
                      </div>
                      <div className="pet-age">
                        <span className="iconify-inline" data-icon="bi:calendar-week-fill"></span>
                        &nbsp;{key.age} {key.yearsOrMonths}
                      </div>
                    </div>
                    {/* <div className="pet-description">{key.desc}</div> */}
                    <div className="pet-name">{key.name}</div>

                    <button className="button pet-read-more-link" onClick={() => handleViewBio(key._id)}>
                      view {key.name}
                    </button>
                  </div>
                );
              })
          )}
        </div>
      </div>

      <DonateSlantedComponent />
    </>
  );
}

export default Adoption;
