import { useContext } from "react";
import AuthContext from "./helpers/Auth";
import { useLocation, Navigate } from "react-router-dom";

export default function RequireStaff({ children }) {
  const Auth = useContext(AuthContext);
  let auth = Auth.checkIsLogin();
  let type = Auth.getLogedInUsertype();
  let location = useLocation();

  if (!auth || type !== "staff") {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
