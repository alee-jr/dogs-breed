import { createContext, ReactNode, useState } from "react";
import { setCookie, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/api";
import { User } from "../types/auth.type";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  async function signIn(email: string) {
    const {
      data: { user },
    } = await api.post("/register", { email });

    setCookie(undefined, "nextauth.token", user.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.interceptors.request.use((config) => {
      config.headers!.Authorization = `${user.token}`;
      return config;
    });

    setUser(user);
    Router.push("/");
  }

  async function signOut() {
    destroyCookie(undefined, "nextauth.token");
    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
