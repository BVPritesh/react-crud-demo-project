// Shared project-wide types to avoid duplication

export type Nullable<T> = T | null;

// Auth
export type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// Post model used in Dashboard
export type Post = {
  userId?: number;
  id: number;
  title: string;
  body: string;
};

// Common form types
export type FormErrors = Record<string, string>;

export type SignInForm = { email: string; password: string };
export type SignInErrors = { email?: string; password?: string };

export type SignUpForm = { name: string; email: string; username: string; password: string };
export type SignUpErrors = FormErrors;