import { Outlet } from "react-router-dom";
import AdminLogIn from "./AdminComponents/AdminLogIn";
import AdminNav from "./AdminComponents/AdminNav";
import * as api from "../api/apiIndex";
import { useState, useEffect } from "react";

// const isAuth = async () => {

// };
// const ProtectedRoutes = () => {
//   const [state, setstate] = useState(false);
//   const verifyUser = async () => {
//     const verification = await api.verifyUserToken(localStorage.getItem("token"));
//     setstate(!!verification.data.isLoggedIn);
//   };
//   verifyUser();

//   return state ? <Outlet /> : <AdminLogIn />;
// };

// const ProtectedRoutes = () => {
//   const verifyUser = async () => {
//     const verification = await api.verifyUserToken(localStorage.getItem("token"));

//     return !!verification.data.isLoggedIn;
//   };
//   // return verifyUser() ? <Outlet /> : <AdminLogIn />;
//   let v = verifyUser().then(() => <Outlet />);

//   if (v) {
//     console.log("v is ", v);
//     return <Outlet />;
//   } else {
//     return <AdminLogIn />;
//   }
// };

// export default ProtectedRoutes;

const ProtectedRoutes = () => {
  const [state, setstate] = useState("loading");
  useEffect(() => {
    const verifyUser = async () => {
      //^ Verify the token for localstorage is valid
      const verification = await api.verifyUserToken(localStorage.getItem("token"));
      setstate(!!verification.data.isLoggedIn);
    };
    verifyUser();
  }, []);

  if (state === "loading") {
    return <AdminNav />;
  } else if (state) {
    return <Outlet />;
  } else {
    return <AdminLogIn />;
  }
};

export default ProtectedRoutes;
