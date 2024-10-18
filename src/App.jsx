import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              // <ProtectedRoute>
              <AppLayout route={route} >
                <route.component />
              </AppLayout>
              // </ProtectedRoute>
            }
          />
        ))}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
