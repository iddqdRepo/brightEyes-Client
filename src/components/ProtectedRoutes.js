import { Outlet } from "react-router-dom";
import AdminLogIn from "./AdminLogIn";
import * as api from "../api/apiIndex";
import { useState, useEffect } from "react";

const ProtectedRoutes = () => {
  const [state, setstate] = useState(false);
  useEffect(() => {
    const verifyUser = async () => {
      const verification = await api.verifyUserToken(localStorage.getItem("token"));

      setstate(!!verification.data.isLoggedIn);
    };
    verifyUser();
  }, []);

  return setTimeout(() => {
    state ? <Outlet /> : <AdminLogIn />;
  }, 1000);
};

export default ProtectedRoutes;
