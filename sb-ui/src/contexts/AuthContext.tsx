import { useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from "../services/api";
import type { AuthUser, LoginInput } from "../services/type";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
      return response.data.user;
    } catch {
      setUser(null);
      return null;
    }
  };

  const login = async (payload: LoginInput) => {
    await loginRequest(payload);
    const currentUser = await refreshUser();

    if (!currentUser) {
      throw new Error("Unable to load the logged-in user");
    }

    return currentUser;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const loadCurrentUser = async () => {
      await refreshUser();
      setIsLoading(false);
    };

    void loadCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
