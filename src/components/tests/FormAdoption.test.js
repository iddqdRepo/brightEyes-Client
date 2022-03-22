import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import FormAdoption from "../FormAdoption";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import { filledInputClasses } from "@mui/material";
global.scrollTo = jest.fn();
jest.mock("axios");
afterAll(() => {
  jest.clearAllMocks();
});
afterEach(cleanup);

const renderAnimal = async (animal) => {
  render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/forms/adoption",
            state: {
              detail: { type: animal },
            },
          },
        ]}
      >
        <FormAdoption />
      </MemoryRouter>
    </HelmetProvider>
  );
};

const initialCatText = [
  "title",
  "name",
  "address",
  "postcode",
  "phone",
  "mobile",
  "email",
  "catName",
  "catColour",
  "numAdults",
  "numChildren",
  "childrenAges",
  "catSleepLocation",
  "catFurtherInfo",
];
const initialDogText = [
  "title",
  "name",
  "address",
  "postcode",
  "phone",
  "mobile",
  "email",
  "dogName",
  "dogType",
  "numAdults",
  "numChildren",
  "childrenAges",
  "exerciseType",
  "exerciseTime",
  "dogSleepLocation",
  "dogFurtherInfo",
];

const initialCatCombo = [
  "catAge",
  "catType",
  "catSex",
  "catAllergy",
  "homeType",
  "rentOrOwn",
  "townOrCountry",
  "nextToRoad",
  "gardenOrYard",
  "otherChildrenVisit",
  "retired",
  "catReason",
  "catHomeAlone",
  "ownOtherCurrentCats",
  "ownOtherCurrentPets",
  "catAwareOfCostsAndLegal",
  "catHowSoon",
  "hearAboutUs",
];

const initialDogCombo = [
  "dogSize",
  "dogAge",
  "dogSex",
  "homeType",
  "rentOrOwn",
  "townOrCountry",
  "nextToRoad",
  "gardenOrYard",
  "otherChildrenVisit",
  "retired",
  "dogReason",
  "dogHomeAlone",
  "ownOtherCurrentDogs",
  "dogOwnOtherCurrentPets",
  "dogAwareOfCostsAndLegal",
  "dogHowSoon",
  "hearAboutUs",
];

const dogHiddenText = [
  "gardenOrYardSize",
  "otherChildrenAges",
  "otherChildrenVisitFrequency",
  "dogHomeAloneHours",
  "dogHomeAloneFrequency",
  "otherCurrentDogBreed",
  "otherCurrentDogTime",
  "dogOtherCurrentPetTypes",
  "otherPastDogTime",
  "otherDogFate",
  "other",
];
const dogHiddenCombo = ["fullyEnclosed", "fenceHeight", "otherCurrentDogNeutered", "ownOtherPastDogs"];

const catHiddenText = [
  "gardenOrYardSize",
  "otherChildrenAges",
  "otherChildrenVisitFrequency",
  "catHomeAloneHours",
  "catHomeAloneFrequency",
  "otherCurrentPetTypes",
  "otherPastCatTime",
  "otherCatFate",
  "other",
];
const catHiddenCombo = ["ownOtherPastCats"];

let catTriggerFieldsObj = {
  gardenOrYard: "Yes",
  otherChildrenVisit: "Yes",
  catHomeAlone: "Yes",
  ownOtherCurrentCats: "No",
  ownOtherPastCats: "As a Child",
  ownOtherCurrentPets: "Yes",
  hearAboutUs: "Other",
};

let dogTriggerFieldsObj = {
  gardenOrYard: "Yes",
  fullyEnclosed: "Yes",
  otherChildrenVisit: "Yes",
  catHomeAlone: "Yes",
  ownOtherCurrentDogs: "No",
  ownOtherPastDogs: "As a Child",

  //to undo above
  ownOtherPastDogs2: "choose",
  ownOtherCurrentDogs2: "Yes",

  dogHomeAlone: "Yes",
  dogOwnOtherCurrentPets: "Yes",
  hearAboutUs: "Other",
};
/*triggers:
    HOME QUESTIONS
    Do you have a garden or yard? Yes | gardenOrYard
    Do other children visit your home? Yes | otherChildrenVisit
    Is your garden/yard fully enclosed? Yes | 

    CAT QUESTIONS
    Will your cat be left at home alone? Yes | catHomeAlone
    do you own other cats? No | ownOtherCurrentCats
    Have you owned a cat before? As a Child | ownOtherPastCats
    Do you own other pets? Yes | ownOtherCurrentPets

    How did you hear about Bright Eyes? Other | hearAboutUs
    */

describe("Adoption Form Test", () => {
  test("should show correct number of fields initially for dog", async () => {
    initialDogCombo.length = 17;
    initialDogText.length = 16;
    renderAnimal("Dog");
    const formTextBoxes = screen.getAllByRole("textbox").map((el) => {
      return el.name;
    });
    const formComboBoxes = screen.getAllByRole("combobox").map((el) => {
      return el.name;
    });
    const formCheckBoxes = screen.getAllByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /submit form/i });
    expect(formTextBoxes.length).toEqual(initialDogText.length);
    expect(formTextBoxes).toEqual(expect.arrayContaining(initialDogText));
    expect(formComboBoxes.length).toEqual(initialDogCombo.length);
    expect(formComboBoxes).toEqual(expect.arrayContaining(initialDogCombo));
    expect(formCheckBoxes.length).toBe(4);
    expect(submitButton).toBeInTheDocument();
  });

  test("should show correct number of fields initially for cat", async () => {
    initialCatCombo.length = 18;
    initialCatText.length = 14;
    renderAnimal("Cat");
    const formTextBoxes = screen.getAllByRole("textbox").map((el) => {
      return el.name;
    });
    const formComboBoxes = screen.getAllByRole("combobox").map((el) => {
      return el.name;
    });
    // console.log(formTextBoxes);
    const formCheckBoxes = screen.getAllByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /submit form/i });
    expect(formTextBoxes.length).toEqual(initialCatText.length);
    expect(formTextBoxes).toEqual(expect.arrayContaining(initialCatText));
    expect(formComboBoxes.length).toEqual(initialCatCombo.length);
    expect(formComboBoxes).toEqual(expect.arrayContaining(initialCatCombo));
    expect(formCheckBoxes.length).toBe(4);
    expect(submitButton).toBeInTheDocument();
  });

  test("should reveal hidden fields on correct input", async () => {
    renderAnimal("Cat");
    let mainTextArray = [];
    let mainComboArray = [];
    let formTextBoxes = screen.getAllByRole("textbox");
    let formComboBoxes = screen.getAllByRole("combobox");
    // let catTriggerFieldsObj = {
    //   gardenOrYard: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /do you have a garden or yard\?/i }), catTriggerFieldsObj.gardenOrYard);
    //   otherChildrenVisit: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Do other children visit your home\?/i }), catTriggerFieldsObj.otherChildrenVisit);
    //   catHomeAlone: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Will your cat be left at home alone\?/i }), catTriggerFieldsObj.catHomeAlone);
    //   ownOtherCurrentCats: "No",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Do you own other cats\?/i }), catTriggerFieldsObj.ownOtherCurrentCats);
    //   ownOtherPastCats: "As a Child",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Have you owned a cat before\?/i }), catTriggerFieldsObj.ownOtherPastCats);
    //   ownOtherCurrentPets: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Do you own other pets\?/i }), catTriggerFieldsObj.ownOtherCurrentPets);
    //   hearAboutUs: "Other",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /How did you hear about Bright Eyes\?/i }), catTriggerFieldsObj.hearAboutUs);
    // };
    formTextBoxes = screen.getAllByRole("textbox");
    formComboBoxes = screen.getAllByRole("combobox");
    mainTextArray = formTextBoxes.map((el) => {
      return el.name;
    });
    mainComboArray = formComboBoxes.map((el) => {
      return el.name;
    });
    expect(mainTextArray.length).toBe(initialCatText.length + catHiddenText.length);
    expect(mainTextArray).toEqual(expect.arrayContaining(catHiddenText));
    expect(mainComboArray.length).toBe(initialCatCombo.length + catHiddenCombo.length);
    expect(mainComboArray).toEqual(expect.arrayContaining(catHiddenCombo));
  });

  //!  OwnOtherDogs Yes and No show different hidden fields
  //^ Do you own other dogs? No, shows the same fields as the cat above (Have you owned a dog before? As a Child...) etc
  //^ Do you own other dogs? Yes, shows different fields than the cat above  (Dog Breeds | Neutered | How long have you had them) etc
  test("should reveal all hidden dog fields on correct input", async () => {
    renderAnimal("Dog");
    let mainTextBoxArray = [];
    let mainComboArray = [];
    let formTextBoxes = screen.getAllByRole("textbox").map((el) => {
      return el.name;
    });
    let formComboBoxes = screen.getAllByRole("combobox").map((el) => {
      return el.name;
    });
    // let dogTriggerFieldsObj = {
    //   gardenOrYard: "Yes",

    userEvent.selectOptions(screen.getByRole("combobox", { name: /do you have a garden or yard\?/i }), dogTriggerFieldsObj.gardenOrYard);
    // fullyEnclosed: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /is your garden\/yard fully enclosed\?/i }), dogTriggerFieldsObj.fullyEnclosed);
    //   otherChildrenVisit: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Do other children visit your home\?/i }), dogTriggerFieldsObj.otherChildrenVisit);
    //   dogHomeAlone: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Will your dog be left at home alone\?/i }), dogTriggerFieldsObj.dogHomeAlone);
    //   ownOtherCurrentDogs: "No",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Do you own other dogs\?/i }), dogTriggerFieldsObj.ownOtherCurrentDogs);
    //   ownOtherPastDogs: "As a Child",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Have you owned a dog before\?/i }), dogTriggerFieldsObj.ownOtherPastDogs);
    mainTextBoxArray.push(...screen.getAllByRole("textbox"));
    mainComboArray.push(...screen.getAllByRole("combobox"));
    // ^to undo above
    //   ownOtherPastDogs2: "choose",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Have you owned a dog before\?/i }), dogTriggerFieldsObj.ownOtherPastDogs2);
    //   ownOtherCurrentDogs2: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Do you own other dogs\?/i }), dogTriggerFieldsObj.ownOtherCurrentDogs2);
    //   dogHomeAlone: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Will your dog be left at home alone\?/i }), dogTriggerFieldsObj.dogHomeAlone);
    //   dogOwnOtherCurrentPets: "Yes",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /Do you own other pets\?/i }), dogTriggerFieldsObj.dogOwnOtherCurrentPets);
    //   hearAboutUs: "Other",
    userEvent.selectOptions(screen.getByRole("combobox", { name: /How did you hear about Bright Eyes\?/i }), dogTriggerFieldsObj.hearAboutUs);
    // };
    mainTextBoxArray.push(...screen.getAllByRole("textbox"));
    mainComboArray.push(...screen.getAllByRole("combobox"));
    formTextBoxes = screen.getAllByRole("textbox");
    formComboBoxes = screen.getAllByRole("combobox");
    let allTextBoxes = new Set(
      mainTextBoxArray.map((el) => {
        return el.name;
      })
    );
    let allComboBoxes = new Set(
      mainComboArray.map((el) => {
        return el.name;
      })
    );
    allComboBoxes = [...allComboBoxes];
    allTextBoxes = [...allTextBoxes];
    expect(allTextBoxes.length).toBe(initialDogText.length + dogHiddenText.length);
    expect(allTextBoxes).toEqual(expect.arrayContaining(dogHiddenText));
    expect(allComboBoxes.length).toBe(initialDogCombo.length + dogHiddenCombo.length);
    expect(allComboBoxes).toEqual(expect.arrayContaining(dogHiddenCombo));
  });

  test("should correctly show and remove error message for dog form", async () => {
    renderAnimal("Dog");
    let errorMessage = screen.queryByText(/please fill in all fields/i);
    expect(errorMessage).not.toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox", { name: /title/i }), "value");
    userEvent.type(screen.getAllByRole("textbox", { name: /name/i })[0], "value");
    userEvent.type(screen.getByRole("textbox", { name: /address/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /postcode/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /phone/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /mobile/i }), "value");
    userEvent.click(screen.getByRole("button", { name: /submit form/i }));
    errorMessage = screen.getByText(/please fill in all fields/i);
    expect(errorMessage).toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox", { name: /email/i }), "value");
    userEvent.click(screen.getByRole("button", { name: /submit form/i }));
    errorMessage = screen.queryByText(/please fill in all fields/i);
    expect(errorMessage).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/thank you/i)).toBeInTheDocument();
    });
  });

  test("should correctly show and remove error message for cat form", async () => {
    renderAnimal("Cat");
    let errorMessage = screen.queryByText(/please fill in all fields/i);
    expect(errorMessage).not.toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox", { name: /title/i }), "value");
    userEvent.type(screen.getAllByRole("textbox", { name: /name/i })[0], "value");
    userEvent.type(screen.getByRole("textbox", { name: /address/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /postcode/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /phone/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /mobile/i }), "value");
    userEvent.click(screen.getByRole("button", { name: /submit form/i }));
    errorMessage = screen.getByText(/please fill in all fields/i);
    expect(errorMessage).toBeInTheDocument();
    userEvent.type(screen.getByRole("textbox", { name: /email/i }), "value");
    userEvent.click(screen.getByRole("button", { name: /submit form/i }));
    errorMessage = screen.queryByText(/please fill in all fields/i);
    expect(errorMessage).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
