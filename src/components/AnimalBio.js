import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as api from "../api/apiIndex";
import DonateSlantedComponent from "./DonateSlantedComponent";
import { Helmet } from "react-helmet-async";

function AnimalBio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [animalBio, setAnimalBio] = useState("");
  const type = animalBio.type;
  const animalId = location.state.detail.id;

  const getSinglePet = async () => {
    const data = await api.fetchSinglePet(animalId);
    setAnimalBio(data.data);
  };

  useEffect(() => {
    getSinglePet();
  }, []);

  const handleRedirectToForm = () => {
    console.log(animalBio.type);
    navigate("../forms/adoption", {
      state: {
        detail: { type },
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>View Animal Bio</title>
        <meta name="description" content="Is this pet the perfect match for you? Click to find out" />
        <link rel="canonical" href={`/adoption/viewBio?id=${location.state.detail.id}`} />
      </Helmet>
      {!animalBio ? (
        <div className="loading-container">
          <div className="Loading-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <div className="bio-page-container">
            <div className="bio-name">{animalBio.name}</div>
            <div className="bio-container">
              <div className="about-header"></div>

              <div className="bio-split-content">
                <div
                  className="bio-split-image"
                  style={{
                    backgroundImage: `url(${animalBio.image})`,
                  }}
                ></div>
                <div className="bio-split-text">
                  <div className="bio-split-text-title">Bio for {animalBio.name}</div>

                  <div className="bio-split-text-description">
                    <div className="bio-split-list-title"></div>
                    <ul className="bio-ul">
                      <li className="bio-list-item">
                        Age
                        <span className="bio-right-text">
                          {animalBio.age} &nbsp;
                          {animalBio.yearsOrMonths}
                        </span>
                      </li>
                      <div className="dotted-line"></div>
                      <li className="bio-list-item">
                        <span className="bio-left-text">Breed</span>
                        <span className="bio-right-text">{animalBio.breed}</span>
                      </li>
                      <div className="dotted-line"></div>
                      <li className="bio-list-item">
                        Size<span className="bio-right-text">{animalBio.size}</span>
                      </li>
                      <div className="dotted-line"></div>
                      <li className="bio-list-item">
                        Suitable for Animals<span className="bio-right-text">{animalBio.suitableForAnimals}</span>
                      </li>
                      <div className="dotted-line"></div>
                      <li className="bio-list-item">
                        Suitable for Children<span className="bio-right-text">{animalBio.suitableForChildren}</span>
                      </li>
                      <div className="dotted-line"></div>
                      <li className="bio-list-item">
                        Adopted<span className="bio-right-text">{animalBio.adopted}</span>
                      </li>
                      {/* <div className="dotted-line"></div> */}
                    </ul>
                  </div>

                  <button className="button bio-adoption-form-button" onClick={() => handleRedirectToForm()}>
                    Adoption Form
                  </button>
                </div>
              </div>

              <div className="bio-description-container">
                <div className="bio-description-content">
                  <pre>{animalBio.desc}</pre>
                </div>
              </div>
            </div>
          </div>
          <DonateSlantedComponent />
        </>
      )}
    </>
  );
}

export default AnimalBio;
