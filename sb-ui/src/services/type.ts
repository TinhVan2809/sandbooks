export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  detail?: unknown;
};

// [Auth]
export type LoginInput = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  nickname: string;
  username: string;
  password: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type CreateBookPayload = {
  title: string;
  isbn: string;
  authorId?: number;
  publisherId?: number;
  publisherYear?: number;
  language?: string;
  description?: string;
};

export type CatalogItem = {
  id: number;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  isbn: string;
  publisherYear: string | null;
  language: string | null;
  description: string | null;
  status: string;
  author: { id: number; name: string } | null;
  publisher: { id: number; name: string } | null;
  category: { id: number; name: string } | null;
  thumbnailUrl: string | null;
  rating: number;
  ratingCount: number;
  createdAt: string | null;
  updatedAt: string | null;
};
