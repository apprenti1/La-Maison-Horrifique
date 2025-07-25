"use client"
import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated, Routes as AppRoutes } from "@/lib/utils";
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
  if (!auth) return <Navigate to={AppRoutes.login.toString()} replace />;
  return <>{children}</>;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const result = await isAuthenticated();
        if (result) {
          setIsAdminUser(await isAdmin());
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div>Chargement...</div>;
  if (!isAdminUser) return <Navigate to={AppRoutes.home.toString()} replace />;
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
  if (auth) return <Navigate to={AppRoutes.home.toString()} replace />;
  return <>{children}</>;
}
