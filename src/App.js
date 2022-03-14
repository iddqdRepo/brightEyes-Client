// import AdminNav from "./components/AdminNav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Adoption from "./components/Adoption";
import Donate from "./components/Donate";
import Forms from "./components/Forms";
import AdminNav from "./components/AdminComponents/AdminNav";
import AdminAddAnimal from "./components/AdminComponents/AdminAddAnimal";
import AdminEditSingleAnimal from "./components/AdminComponents/AdminEditSingleAnimal";
import AdminViewSingleForm from "./components/AdminComponents/AdminViewSingleForm";
// import AdminEditRemoveAnimal from "./components/AdminComponents/AdminEditRemoveAnimal";
// import AdminAnimalArchive from "./components/AdminComponents/AdminAnimalArchive";
import AdminAddUser from "./components/AdminComponents/AdminAddUser";
import FormAdoption from "./components/FormAdoption";
import FormGiftAid from "./components/FormGiftAid";
import FormVolunteer from "./components/FormVolunteer";
import AnimalBio from "./components/AnimalBio";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditAnimalAnimalArchive from "./components/AdminComponents/AdminEditAnimalAnimalArchive";
import AdminFormsFormsArchive from "./components/AdminComponents/AdminFormsFormsArchive";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Home />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Nav />
                <About />
              </>
            }
          />
          <Route
            path="/adoption"
            element={
              <>
                <Nav />
                <Adoption />
              </>
            }
          />
          <Route
            path="/adoption/viewBio"
            element={
              <>
                <Nav />
                <AnimalBio />
              </>
            }
          />
          <Route
            path="/donate"
            element={
              <>
                <Nav />
                <Donate />
              </>
            }
          />
          {/* <Route
            path="/volunteer"
            element={
              <>
                <Nav />
                <Volunteer />
              </>
            }
          /> */}
          <Route
            path="/forms"
            element={
              <>
                <Nav />
                <Forms />
              </>
            }
          />
          <Route
            path="/forms/adoption"
            element={
              <>
                <Nav />
                <FormAdoption />
              </>
            }
          />

          <Route
            path="/forms/giftaid"
            element={
              <>
                <Nav />
                <FormGiftAid />
              </>
            }
          />
          <Route
            path="/forms/volunteer"
            element={
              <>
                <Nav />
                <FormVolunteer />
              </>
            }
          />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/admin"
              element={
                <>
                  <AdminNav />
                  <AdminAddAnimal />
                </>
              }
            />

            <Route
              path="/admin/add"
              element={
                <>
                  <AdminNav />
                  <AdminAddAnimal />
                </>
              }
            />
            <Route
              path="/admin/edit"
              element={
                <>
                  <AdminNav />
                  <EditAnimalAnimalArchive type={"edit"} />
                </>
              }
            />
            <Route
              path="/admin/editAnimal/"
              element={
                <>
                  <AdminNav />
                  <AdminEditSingleAnimal />
                </>
              }
            />
            <Route
              path="/admin/Forms"
              element={
                <>
                  <AdminNav />
                  <AdminFormsFormsArchive type="forms" />
                </>
              }
            />
            <Route
              path="/admin/animalArchive"
              element={
                <>
                  <AdminNav />
                  <EditAnimalAnimalArchive type="archive" />
                </>
              }
            />
            <Route
              path="/admin/formsArchive"
              element={
                <>
                  <AdminNav />
                  <AdminFormsFormsArchive type="archive" />
                </>
              }
            />
            <Route
              path="/admin/viewForm/"
              element={
                <>
                  <AdminNav />
                  <AdminViewSingleForm />
                </>
              }
            />
            <Route
              path="/admin/addUser"
              element={
                <>
                  <AdminNav />
                  <AdminAddUser />
                </>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

// adopted not reserved
// embedded yt video in about us page
// forms in nav bar for all forms they have - download and fill in online
// can dogs be added on mobile?

// db
// suitable with animals

// forms:
// standing order
// gift aid

// payment:
// paypal
// standing order (form)
