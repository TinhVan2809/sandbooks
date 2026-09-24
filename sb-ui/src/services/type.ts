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

export type AuthUser = {
  id: number;
  username: string;
  nickname: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
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

export type Category = CatalogItem & {
  description?: string | null;
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

// [Reviews]
export type Review = {
  reviewId: number;
  bookId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    nickname: string;
    role: string;
  };
  bookTitle?: string;
};
export type CreateReviewPayload = {
  bookId: number;
  rating: number;
  comment: string;
};
