"use client"
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/utils";
import { useEffect, useState } from "react";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await isAuthenticated();
        setAuth(result);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (!auth) return <Navigate to={Routes.login.toString()} replace />;
  return <>{children}</>;
}

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await isAuthenticated();
        setAuth(result);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (auth) return <Navigate to={Routes.home.toString()} replace />;
  return <>{children}</>;
}

export const Routes = {
  home: {
    toString: () => "/" as const,
  },
  login: {
    toString: () => "/login" as const,
  },
  logout: {
    toString: () => "/logout" as const,
  },
  dashboard: {
    toString: () => "/dashboard" as const,
  },
}