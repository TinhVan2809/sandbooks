const API_BASE_URL = "https://sandbooks-api.vercel.app/api";

export const API_IMG_URL = "https://sandbooks-api.vercel.app";

import { type LoginInput, type RegisterPayload, type ApiResponse, type AuthUser, type Book, type CatalogItem, type Category, type CreateBookPayload } from "./type";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

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
    throw new ApiError(body.message || "Request failed", response.status);
  }

  return body as ApiResponse<T>;
};

// [Auth]
export const login = (payload: LoginInput) =>
  request<{ user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getCurrentUser = () =>
  request<{ user: AuthUser }>("/auth/me", { method: "GET" }).catch(async (error: unknown) => {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }

    await request<{ user: AuthUser }>("/auth/refresh", { method: "POST" });
    return request<{ user: AuthUser }>("/auth/me", { method: "GET" });
  });

export const register = (payload: RegisterPayload) =>
  request<{ user: { id: number; nickname: string; username: string } }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const logout = () =>
  request<null>("/auth/logout", {
    method: "POST",
  });

export const saveBook = (bookId: number) =>
  request<null>(`/books/${bookId}/save`, {
    method: "POST",
  });



export const getAuthors = () => request<{ items: CatalogItem[] }>("/authors", { method: "GET" });

export const getPublishers = () => request<{ items: CatalogItem[] }>("/publishers", { method: "GET" });

export const getCategories = () => request<{ items: Category[] }>("/categories", { method: "GET" });

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

// [Books]
export const getListBooks = () =>
  request<{ items: Book[], pagination?: { total: number, page: number, totalPages: number } }>("/books", { method: "GET" });

export const getMostReviewedBooks = () =>
  request<{ items: Book[] }>("/books/most-reviewed", { method: "GET" });

export const getNewestBooks = () =>
  request<{ items: Book[] }>("/books/newest", { method: "GET" });

export const getRecommendedBooks = () =>
  request<{ items: Book[] }>("/books/recommended", { method: "GET" });
