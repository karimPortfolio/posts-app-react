import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import PostsContext from "./context/PostsContext.jsx";
import CategoriesContext from "./context/CategoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <PostsContext>
          <CategoriesContext>
            <App />
          </CategoriesContext>
        </PostsContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
);
