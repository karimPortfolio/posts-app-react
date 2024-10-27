import { createContext, useContext, useState } from "react";
import api from "../boot/api";
import { AuthStore } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

export const categoriesStore = createContext();

const CategoriesContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(null);
  const { auth } = useContext(AuthStore);

  const errorStatus = [401, 400, 422];
  const { toast } = useToast();

  const fetchCategories = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      const response = await api.get("/categories");
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (err) {
      if (errorStatus.includes(err.status)) return;
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

  const createCategory = async (data) => {
    console.log(data);
    if (!auth) {
      toast({
        title: "Error",
        description: "Sign in first.",
        variant: "destructive",
      });
    }
    try {
      const response = await api.post("/categories", data)
      if (response.status == 200) {
        console.log(response.data);
      }
    }
    catch (err) {
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
    }
    finally {
      setLoading(false);
    }
  }

  const value = {
    categories,
    fetchCategories,
    loading,
    createCategory
  };

  return <categoriesStore.Provider value={value}>{children}</categoriesStore.Provider>;
};

export default CategoriesContext;
