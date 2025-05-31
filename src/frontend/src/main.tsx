import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Login from "./Login.tsx";
import Dashboard from "./Dashboard.tsx";
import RequireAuth from "@components/RequireAuth.tsx";
import { AuthStateProvider } from "./services/AuthState.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthStateProvider>
      <RouterProvider router={router} />
    </AuthStateProvider>
  </StrictMode>
);
