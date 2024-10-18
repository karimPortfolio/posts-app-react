import { createContext, useContext, useState } from "react";
import api from "../boot/api";
import { AuthStore } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

export const postsStore = createContext();

const PostsContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthStore);

  const errorStatus = [401, 400, 422];
  const { toast } = useToast();

  const fetchPosts = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      const response = await api.get("/posts");
      if (response.status === 200) {
        setPosts(response.data);
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

  const value = {
    posts,
    fetchPosts,
    loading,
  };

  return <postsStore.Provider value={value}>{children}</postsStore.Provider>;
};

export default PostsContext;
