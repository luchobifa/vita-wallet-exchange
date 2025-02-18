import React, { createContext, useState, useEffect } from "react";
import { AuthHeaders, User } from "../types/auth";

type AuthContextType = {
  user: User | null;
  headers: AuthHeaders | null;
  setAuth: (user: User, headers: AuthHeaders) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [headers, setHeaders] = useState<AuthHeaders | null>(() => {
    const storedHeaders = localStorage.getItem("auth_headers");
    return storedHeaders ? JSON.parse(storedHeaders) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("auth_headers")
  );

  const setAuth = (user: User, headers: AuthHeaders) => {
    setUser(user);
    setHeaders(headers);
    setIsAuthenticated(true);
    localStorage.setItem("auth_headers", JSON.stringify(headers));
  };

  const logout = () => {
    setUser(null);
    setHeaders(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_headers");
  };

  useEffect(() => {
    const storedHeaders = localStorage.getItem("auth_headers");
    if (storedHeaders) {
      const parsedHeaders: AuthHeaders = JSON.parse(storedHeaders);
      setHeaders(parsedHeaders);
    }
  }, []);

  useEffect(() => {
    if (!headers?.expiry) return;
    const expiryTimestamp = Number(headers.expiry) * 1000;
    const checkSession = () => {
      if (Date.now() >= expiryTimestamp) {
        logout();
      }
    };
    const interval = setInterval(checkSession, 10000);
    return () => clearInterval(interval);
  }, [headers]);

  return (
    <AuthContext.Provider
      value={{
        user,
        headers,
        setAuth,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
