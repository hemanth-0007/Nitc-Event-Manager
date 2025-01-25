
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, role, ...rest }) => {
  const token = Cookies.get("token");

  if (!token) return <Navigate to="/" />; // Redirect if no token

  const decoded = jwtDecode(token);
  if (decoded.role != role) return <Navigate to="/" />; // Redirect if role does not match

  return element;
};

export default ProtectedRoute;