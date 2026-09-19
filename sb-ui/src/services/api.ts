const API_BASE_URL = "http://localhost:8000/api";

import { type LoginInput, type RegisterPayload, type ApiResponse } from "./type";

const request = async <T>(path: string, options: RequestInit): Promise<ApiResponse<T>> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Request failed");
  }

  return body as ApiResponse<T>;
};

export const login = (payload: LoginInput) =>
  request<{ user: { id: number; nickname: string; username: string } }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const register = (payload: RegisterPayload) =>
  request<{ user: { id: number; nickname: string; username: string } }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
