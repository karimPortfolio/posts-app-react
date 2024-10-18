import { useContext, useEffect } from "react";
import { AuthStore } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
  const { auth } = useContext(AuthStore);

  useEffect(() => {
    console.log(auth);
  }, []);

  if (!auth) return <Navigate to="/signin" />;

  return children;
}
