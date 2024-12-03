// index.js (Routes)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom"; // Import Navigate
import AddDestination from "./pages/admin/AddDestinationPage";
import DestinationDetailsPage from "./pages/user/DestinationDetailsPage";
import ClientPage from "./pages/user/DestinationsPage";
import AdminTable from "./pages/admin/AdminTable";
import Demands from "./pages/admin/Demands";
import AdminHomePage from "./pages/owner/ownerHomePage";
import HomePage from "./pages/user/HomePage";
import AboutPage from "./pages/user/AboutPage";
import NotFoundPage from "./pages/admin/NotFoundPage";
import LoginPage from "./pages/admin/loginPage";
import OwnerAuthPage from "./pages/owner/ownerLogin";
import MenuPage from "./pages/owner/MenuPage";
import EditOwnerProfile from "./pages/owner/EditOwnerProfile";
import ReservationsDisplay from "./pages/owner/ReservationsDisplay";
import Offers from "./pages/owner/Offers";
import Dashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import Owner from "./pages/admin/Owner";
import Clients from "./pages/admin/Clients";
import MesRes from "./pages/user/MesRes";
import DestinationsByOwner from "./pages/owner/DestinationsByOwner";
import EditUserProfile from "./pages/user/EditUserProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/admin",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <AdminTable /> },
      { path: "tables", element: <AdminTable /> },
      { path: "demands", element: <Demands /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "owners", element: <Owner /> },
      { path: "clients", element: <Clients /> },
    ],
  },
  {
    path: "/destination_details/:id",
    element: <DestinationDetailsPage />,
  },
  {
    path: "/destinations",
    element: <ClientPage />,
  },
  {
    path: "/login-owner",
    element: <OwnerAuthPage isLogin={true} userType="owner" />,
  },
  {
    path: "/signup-owner",
    element: <OwnerAuthPage isLogin={false} userType="owner" />,
  },
  {
    path: "/login-client",
    element: <OwnerAuthPage isLogin={true} userType="client" />,
  },
  {
    path: "/signup-client",
    element: <OwnerAuthPage isLogin={false} userType="client" />,
  },
  {
    path: "/owner-home-page",
    element: <AdminHomePage />,
    children: [
      { index: true, element: <DestinationsByOwner /> },
      { path: "destination_owner", element: <DestinationsByOwner /> },
      { path: "menus/:id", element: <MenuPage /> },
      { path: "add_DestinationsByOwner/:id", element: <AddDestination /> },
      { path: "owner_profile/:id", element: <EditOwnerProfile /> },
      { path: "reservations", element: <ReservationsDisplay /> },
      { path: "offers", element: <Offers /> },
    ],
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  { path: "user_profile", element: <EditUserProfile /> },

  {
    path: "/mes-reservations/:clientId",
    element: <MesRes />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
