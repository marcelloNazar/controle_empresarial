import { createContext, useState, useEffect, ReactNode } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import http from "@/utils/http";

interface SignInData {
  username: string;
  password: string;
}

interface AuthContextData {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({
  token: null,
  role: null,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedRole = Cookies.get("role");

    if (storedToken !== undefined && storedRole !== undefined) {
      setToken(storedToken);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (token && role) {
        if (role === "ADMIN") {
          Router.push("/admin");
        } else if (role === "USER") {
          Router.push("/user");
        }
      } else {
        Router.push("/login");
      }
    }
  }, [token, role, loading]);

  async function signIn({ username, password }: SignInData) {
    const response = await http.post("auth/signin", {
      username,
      password,
    });

    const data = response.data;

    setToken(data.token);
    setRole(data.role);

    Cookies.set("token", data.token);
    Cookies.set("role", data.role);
  }

  function signOut() {
    Cookies.remove("token");
    Cookies.remove("role");

    setToken(null);
    setRole(null);

    Router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ token, role, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
