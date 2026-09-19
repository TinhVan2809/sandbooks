const API_BASE_URL = "http://localhost:8000/api";

import { type LoginInput, type RegisterPayload, type ApiResponse, type Book, type CatalogItem, type CreateBookPayload } from "./type";

const request = async <T>(path: string, options: RequestInit): Promise<ApiResponse<T>> => {
  const headers = options.body instanceof FormData
    ? { ...options.headers }
    : { "Content-Type": "application/json", ...options.headers };
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Request failed");
  }

  return body as ApiResponse<T>;
};

export const login = (payload: LoginInput) =>
  request<{ user: { id: number; nickname: string; username: string; role: string } }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const register = (payload: RegisterPayload) =>
  request<{ user: { id: number; nickname: string; username: string } }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getAuthors = () => request<{ items: CatalogItem[] }>("/authors", { method: "GET" });

export const getPublishers = () => request<{ items: CatalogItem[] }>("/publishers", { method: "GET" });

export const createBook = (payload: CreateBookPayload, files: File[]) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  });

  files.forEach((file) => formData.append("images", file));

  return request<{ book: Book }>("/books", {
    method: "POST",
    body: formData,
  });
};
