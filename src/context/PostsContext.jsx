import { createContext, useContext, useState } from "react";
import api from "../boot/api";
import { AuthStore } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";

export const postsStore = createContext();

const PostsContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(null);
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

  const createPost = async (data) => {
    console.log(data);
    if (!auth) {
      toast({
        title: "Error",
        description: "Sign in first.",
        variant: "destructive",
      });
    }
    try {
      const response = await api.post("/posts", data)
      if (response.status == 200) {
        toast({
          title: "Success",
          description: "Post has been created with success.",
          variant: "success",
          className: "bg-green-500 text-white"
        });
        await fetchPosts();
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

  const deletePost = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/posts/${id}`);
      console.log(response);
      if (response.status == 204) {
        toast({
          title: "Success",
          description: "Post has been deleted with success.",
          variant: "success",
          className: "bg-green-500 text-white"
        });
        await fetchPosts();
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
    posts,
    fetchPosts,
    loading,
    createPost,
    deletePost
  };

  return <postsStore.Provider value={value}>{children}</postsStore.Provider>;
};

export default PostsContext;
