import { Route, Routes } from "react-router-dom";
import HomePage from "./app/home/Page";
import LoginPage from "./app/login/Page";
import { PrivateRoute, PublicRoute } from "./components/core/Routes";
import DashboardPage from "./app/dashboard/Page";
import LogoutPage from "./app/logout/Page";
import {Routes as AppRoutes} from "./components/core/Routes";

export default function App() {
  return (
    <Routes>
      <Route
        path={AppRoutes.home.toString()}
        element={<HomePage />}
      />
      <Route
        path={AppRoutes.login.toString()}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={AppRoutes.logout.toString()}
        element={<LogoutPage />}
      />
      <Route
        path={AppRoutes.dashboard.toString()}
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}