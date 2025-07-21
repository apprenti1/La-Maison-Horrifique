import { Route, Routes } from "react-router-dom";
import HomePage from "./app/home/Page";
import LoginPage from "./app/login/Page";
import {PrivateRoute, PublicRoute} from "./components/core/Routes";
import DashboardPage from "./app/dashboard/Page";
import LogoutPage from "./app/logout/Page";
import SessionsManagementPage from "./app/dashboard/sessions/SessionsManagementPage";
import {Navigate} from "react-router-dom";
import EscapeGamesPage from "@/app/escapegames/Page.tsx";
import EscapeGamesCreatePage from "@/app/escapegames/create/Page.tsx";
import {Routes as AppRoutes} from "./lib/utils";
import LegalNoticesPage from "./app/legal-notices/page";
import CreateEmployeePage from "./app/dashboard/employees/create-employee/page";
import EmployeesPage from "@/app/dashboard/employees/page.tsx";

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
      <Route
        path={AppRoutes.dashboard.employees.create.toString()}
        element={
          <PrivateRoute>
            <CreateEmployeePage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.dashboard.employees.toString()}
        element={
          <PrivateRoute>
            <EmployeesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.escapeGames.toString()}
        element={
          <PrivateRoute>
            {/* Placeholder for Escape Games Page */}
            <EscapeGamesPage></EscapeGamesPage>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.escapeGame.toString(':id')}
        element={
          <PrivateRoute>
            {/* Placeholder for Escape Game Page */}
            <div>Escape Game Page</div>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.escapeGameCreate.toString()}
        element={
          <PrivateRoute>
            {/* Placeholder for Create Escape Game Page */}
            <EscapeGamesCreatePage></EscapeGamesCreatePage>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.escapeGameEdit.toString(':id')}
        element={
          <PrivateRoute>
            {/* Placeholder for Edit Escape Game Page */}
            <div>Edit Escape Game Page</div>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.escapeGameDelete.toString(':id')}
        element={
          <PrivateRoute>
            {/* Placeholder for Delete Escape Game Page */}
            <div>Delete Escape Game Page</div>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.escapeGameStats.toString(':id')}
        element={
          <PrivateRoute>
            {/* Placeholder for Escape Game Stats Page */}
            <div>Escape Game Stats Page</div>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.dashboard.sessions.toString()}
        element={
          <PrivateRoute>
            <SessionsManagementPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoutes.legalNotices.toString()}
        element={<LegalNoticesPage />}
      />
      <Route
        path="*"
        element={<Navigate to={AppRoutes.home.toString()} replace />}
      />
    </Routes>
  );
}
