import { createContext } from "react";
import type { AuthUser, LoginInput } from "../services/type";

export type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
