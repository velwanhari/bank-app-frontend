import { useContext, useEffect } from "react";
import AuthContext from "./helpers/Auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);
  
  useEffect(() => {
    Auth.logout();
    navigate("/login");
  }, []);
}
