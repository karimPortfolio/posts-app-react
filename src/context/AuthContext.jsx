import { createContext, useEffect, useState } from "react";
import api from "../boot/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const AuthStore = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});

  const errorStatus = [401, 400, 422, 403];

  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (credentials) => {
    setLoading(true);
    setValidation({});
    try {
      const response = await api.post("/login", credentials);
      if (response.status === 200) {
        setAuth(true);
        setUser(response.data.user);
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (errorStatus.includes(err.status)) {
        if (err.status === 422 || err.status === 403) {
          setValidation(err.response.data);
        }
        toast({
          title: "Error",
          description: err.response.data?.message ?? err.response.data,
          variant: "destructive",
        });
        return;
      }
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials) => {
    setLoading(true);
    setValidation({});
    try {
      const response = await api.post("/register", credentials);
      if (response.status === 200) {
        setAuth(true);
        setUser(response.data.user);
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (errorStatus.includes(err.status)) {
        if (err.status === 422 || err.status === 403) {
          setValidation(err.response.data);
        }
        toast({
          title: "Error",
          description: err.response.data?.message ?? err.response.data,
          variant: "destructive",
        });
        return;
      }
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    if (user) return;
    try {
      const response = await api.get("/me");
      if (response.status === 200) {
        setAuth(true);
        setUser(response.data.user);
        console.log("Auth:" + auth);
      }
    } catch (err) {
      console.log(err);
      if (err.status in errorStatus) {
        toast({
          title: "Error",
          description: err.response.data?.message ?? err.response.data,
          variant: "destructive",
        });
        return;
      }
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    try {
      const response = api.get("/logout");
      setAuth(false);
      setUser(null);
      navigate("/signin", { replace: true });
    } catch (err) {
      console.log(err);
      if (err.status in errorStatus) {
        toast({
          title: "Error",
          description: err.response.data?.message ?? err.response.data,
          variant: "destructive",
        });
        return;
      }
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };



  const value = {
    auth,
    user,
    loading,
    login,
    fetchUser,
    logout,
    validation,
    register
  };

  return <AuthStore.Provider value={value}>{children}</AuthStore.Provider>;
};

export default AuthContext;
