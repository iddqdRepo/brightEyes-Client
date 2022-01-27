import axios from "axios";
import { prod } from "../prod";
console.log("prod is ", prod);
const petURL = prod ? "https://bright-eyes-as-backend.herokuapp.com/pets" : "http://localhost:5000/pets";
const formURL = prod ? "https://bright-eyes-as-backend.herokuapp.com/forms" : "http://localhost:5000/forms";
const userURL = prod ? "https://bright-eyes-as-backend.herokuapp.com/user" : "http://localhost:5000/user";
const mailURL = prod ? "https://bright-eyes-as-backend.herokuapp.com/send" : "http://localhost:5000/send";

// const petURL = "http://localhost:5000/pets";
// const formURL = "http://localhost:5000/forms";
// const userURL = "http://localhost:5000/user";
// const mailURL = "http://localhost:5000/send";

export const fetchPets = () => axios.get(petURL);
export const fetchSinglePet = (id) => axios.get(`${petURL}/${id}`);
export const addPets = (animalToAdd) => axios.post(petURL, animalToAdd);
export const deletePet = (id) => {
  console.log("ID passed to delete pet is ", id);
  return axios.delete(`${petURL}/${id}`);
};
export const updatePet = (id, updatedPet) => {
  console.log("ID passed to update pet is ", id);
  console.log("updatedPet passed to update pet is ", updatedPet);
  return axios.patch(`${petURL}/${id}`, updatedPet);
};

export const fetchForms = (formType) => axios.get(`${formURL}/${formType}`);
export const fetchSingleForm = (formType, id) => axios.get(`${formURL}/${formType}/${id}`);
export const addForm = (formType, formToAdd) => axios.post(`${formURL}/${formType}`, formToAdd);
export const deleteForm = (formType, id) => {
  console.log("ID passed to delete form is ", id);
  return axios.delete(`${formURL}/${formType}/${id}`);
};
export const updateForm = (formType, id, updatedForm) => {
  console.log("ID passed to update form is ", id);
  console.log("updatedform passed to update form is ", updatedForm);
  return axios.patch(`${formURL}/${formType}/${id}`, updatedForm);
};

export const logUserIn = (userInfo) => {
  console.log("ID passed to login form is ", userInfo);
  return axios.post(userURL + "/login", userInfo);
};

export const verifyUserToken = (user) =>
  axios.get(userURL + "/verify", {
    headers: { "x-access-token": user },
  });

export const sendMail = (data) => axios.post(`${mailURL}`, data);
