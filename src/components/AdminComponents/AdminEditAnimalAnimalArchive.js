import React, { useState, useEffect } from "react";
import { fetchPets, deletePet, updatePet } from "../../api/apiIndex";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { Helmet } from "react-helmet-async";

function EditAnimalAnimalArchive(props) {
  const [animal, setAnimal] = useState("");
  const [search, setSearch] = useState("");
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  //console.log("animal ", animal);
  useEffect(() => {
    setIsLoading(true);
    getAllPets();
  }, [props]);

  const getAllPets = async () => {
    // //console.log("fetching");
    const data = await fetchPets();
    // //console.log(data.data);
    const notAdopted = data.data.filter((x) => {
      return x.adopted === "No";
    });
    const adopted = data.data.filter((x) => {
      return x.adopted === "Yes";
    });
    props.type === "archive" ? setAnimal(adopted) : setAnimal(notAdopted);
    setIsLoading(false);
  };

  const deleteSelectedPet = async (id) => {
    //console.log("deleting");
    const data = await deletePet(id);

    window.location.reload();
  };

  const onClickEditButton = (id) => {
    // //console.log("ID passed AdminEditRemove is ", id);
    navigate(`/admin/editAnimal?id=${id}`, {
      state: {
        detail: { id },
      },
    });
  };
  const onClickArchiveButton = async (id) => {
    // //console.log("ID passed AdminEditRemove is ", id);
    // //console.log(`archiving pet with id of ${id}`);
    let toChange = animal;
    let updatedObj;
    toChange.forEach((key) => {
      if (key._id === id) {
        key["adopted"] = "Yes";
        updatedObj = key;
      }
    });

    const awaitPetUpdate = await updatePet(id, updatedObj);
    if (awaitPetUpdate.data.message === "Pet updated successfully") {
      // //console.log("Pet updated successfully");
      setAnimal(toChange);
    }
    window.location.reload();
  };
  const Modal = () => (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      <span> Modal content </span>
    </Popup>
  );

  const onClickDeleteButton = (id) => {
    //console.log("ID passed AdminEditRemove is ", id);
    //console.log(`deleting pet with id of ${id}`);
    deleteSelectedPet(id);
  };

  const onClickUnArchiveButton = async (id) => {
    //console.log("ID passed AdminEditRemove is ", id);
    //console.log(`archiving pet with id of ${id}`);
    let toChange = animal;
    let updatedObj;
    //console.log("toChange = ", toChange);

    toChange.forEach((key) => {
      if (key._id === id) {
        key["adopted"] = "No";
        updatedObj = key;
      }
    });

    const awaitPetUpdate = await updatePet(id, updatedObj);

    if (awaitPetUpdate.data.message === "Pet updated successfully") {
      //console.log("Pet updated successfully");
      setAnimal(toChange);
    }
    window.location.reload();
  };
  {
  }
  return (
    <>
      <Helmet>
        <title>Archived Animals</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="add-animal-page-container">
        {props.type === "archive" ? <div className="admin-title">ARCHIVED ADOPTED ANIMALS</div> : <div className="admin-title">EDIT ANIMAL</div>}
        {isLoading ? (
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
        ) : (
          <>
            <div className="add-animal-content-container">
              <div className="add-animal-content">
                <div className="add-animal-title">Search animal by name</div>
                <input
                  className="animal-form-box"
                  autoComplete="off"
                  type="text"
                  id="name"
                  name="name"
                  onInput={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="edit-animal-content-container">
              {animal
                .filter((val) => {
                  //^ Returns an array of the filtered animals to map over below

                  if (search === "") {
                    return val;
                  } else {
                    //console.log("filteredAnimals ", search);
                    return val.name.toLowerCase().includes(search.toLowerCase());
                  }
                })
                .map((obj) => {
                  return props.type === "archive" ? (
                    <div key={obj._id} data-testid="AnimalContainer" className="edit-animal-content">
                      <div className="edit-animal-content-left">
                        <div
                          className="edit-animal-image"
                          style={{
                            backgroundImage: `url(${obj.image})`,
                          }}
                        ></div>
                        <div className="edit-animal-name">{obj.name}</div>
                      </div>
                      <div className="edit-animal-content-right">
                        <div className="edit-animal-delete-icon" onClick={() => Modal()}>
                          <Popup
                            trigger={
                              <button className="edit-button tooltip">
                                <span className="tooltiptext">Un-archive Animal (move back to edit animal)</span>
                                <span className="iconify-inline" data-icon="fluent:tray-item-add-24-filled" data-width="30"></span>
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div className="modal">
                                <button className="close" onClick={close}></button>
                                <div className="header"> Are You Sure You Want To UNArchive {obj.name} (this will put it back to "edit animal")</div>
                                <div className="actions">
                                  <button
                                    className="button"
                                    onClick={() => {
                                      onClickUnArchiveButton(obj._id);
                                      close();
                                    }}
                                  >
                                    YES
                                  </button>
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
                        <div className="edit-animal-delete-icon" onClick={() => Modal()}>
                          <Popup
                            trigger={
                              <button className="edit-button tooltip">
                                <span className="tooltiptext">Delete Animal</span>

                                <span className="iconify-inline" data-icon="akar-icons:circle-x-fill" data-width="30"></span>
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div className="modal">
                                <button className="close" onClick={close}></button>
                                <div className="header"> Are You Sure You Want To Delete {obj.name} </div>
                                <div className="actions">
                                  <button
                                    className="button"
                                    onClick={() => {
                                      onClickDeleteButton(obj._id);
                                      close();
                                    }}
                                  >
                                    YES
                                  </button>
                                  <button
                                    className="button"
                                    onClick={() => {
                                      //console.log("modal closed ");
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
                  ) : (
                    <div key={obj._id} className="edit-animal-content">
                      <div className="edit-animal-content-left">
                        <div
                          className="edit-animal-image"
                          style={{
                            backgroundImage: `url(${obj.image})`,
                          }}
                        ></div>
                        <div className="edit-animal-name">{obj.name}</div>
                      </div>
                      <div className="edit-animal-content-right">
                        <div className="edit-animal-delete-icon" onClick={() => Modal()}>
                          <Popup
                            trigger={
                              <button className="edit-button tooltip">
                                <span className="tooltiptext">Archive Animal</span>
                                <span className="iconify-inline" data-icon="fluent:tray-item-remove-24-filled" data-width="30"></span>
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div className="modal">
                                <button className="close" onClick={close}></button>
                                <div className="header"> Are You Sure You Want To Archive {obj.name} </div>
                                <div className="actions">
                                  <button
                                    className="button"
                                    onClick={() => {
                                      onClickArchiveButton(obj._id);
                                      close();
                                    }}
                                  >
                                    YES
                                  </button>
                                  <button
                                    className="button"
                                    onClick={() => {
                                      //console.log("modal closed ");
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
                        <div className="edit-animal-edit-icon">
                          <button className="edit-button tooltip" onClick={() => onClickEditButton(obj._id)}>
                            <span className="tooltiptext">Edit Animal</span>
                            <span className="iconify-inline" data-icon="bx:bxs-edit-alt" data-width="30"></span>
                          </button>
                        </div>
                        <div className="edit-animal-delete-icon" onClick={() => Modal()}>
                          <Popup
                            trigger={
                              <button className="edit-button tooltip">
                                <span className="tooltiptext">Delete Animal</span>

                                <span className="iconify-inline" data-icon="akar-icons:circle-x-fill" data-width="30"></span>
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div className="modal">
                                <button className="close" onClick={close}></button>
                                <div className="header"> Are You Sure You Want To Delete {obj.name} </div>
                                <div className="actions">
                                  <button
                                    className="button"
                                    onClick={() => {
                                      onClickDeleteButton(obj._id);
                                      close();
                                    }}
                                  >
                                    YES
                                  </button>
                                  <button
                                    className="button"
                                    onClick={() => {
                                      //console.log("modal closed ");
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
          </>
        )}
      </div>
    </>
  );
}

export default EditAnimalAnimalArchive;
