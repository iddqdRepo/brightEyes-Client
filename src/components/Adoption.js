import React, { useState, useEffect } from "react";
import * as api from "../api/apiIndex";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Adoption() {
  let navigate = useNavigate();
  const [animals, setAnimals] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState("");

  const getAllAnimals = async () => {
    console.log("fetching");
    const data = await api.fetchPets();
    setAnimals(data.data);
    setFilteredAnimals(data.data);
    console.log(animals.data);
  };
  useEffect(() => {
    getAllAnimals();
  }, []);

  const handleViewBio = (id) => {
    console.log("animal ID = ", id);

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
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
          {console.log("filteredAnimals = ", filteredAnimals)}
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
                  <div className="pet-container">
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

      <div className="slanted-div-donate">
        <div className="slanted-div-donate-content-container">
          <div className="slanted-div-left-donate-text-container">
            <span className="donation-script-text">Please</span> <br />
            <span className="donation-header">Make a Donation</span> <br />
            <div className="donation-subtext">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et repellat quisquam nesciunt ipsam similique, quasi cupiditate? Ad nihil
              consectetur quas quo rem debitis aut molestias itaque dolorum necessitatibus. Accusantium, quos?
            </div>{" "}
            <br />
          </div>
          <div className="slanted-div-right-donate-button-container">
            <button className="button slanted-div-donate-button">Donate</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adoption;
