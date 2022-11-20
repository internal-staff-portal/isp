import { Guard } from "@authfunctions/react";
import React from "react";
import {
  BrowserRouter,
  IndexRouteProps,
  Navigate,
  Outlet,
  PathRouteProps,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./Auth";
import SidebarLayout from "./Layouts/SidebarLayout";
import Dashboard from "./Pages/DashboardPage";
import Login from "./Pages/LoginPage";

type TRoute = IndexRouteProps | PathRouteProps;

const routes: TRoute[] = [{ index: true, element: <Dashboard /> }];
const redirects: { from: string; to: string }[] = [
  { from: "/dashboard", to: "/" },
];

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Outlet />
            </Auth>
          }
        >
          {redirects.map(({ from, to }, idx) => (
            <Route path={from} element={<Navigate to={to} />} key={idx} />
          ))}
          <Route
            path="/login"
            element={
              <Guard type="LoggedOutOnly">
                <Login />
              </Guard>
            }
          />
          <Route
            path="/"
            element={
              <Guard type="LoggedInOnly">
                <SidebarLayout>
                  <Outlet />
                </SidebarLayout>
              </Guard>
            }
          >
            {routes.map((route, idx) => (
              <Route {...route} key={idx} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
