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