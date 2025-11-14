// Centralized API constants / endpoints
export const API_BASE: string = (import.meta.env.VITE_API_BASE_URL as string) ?? "https://jsonplaceholder.typicode.com";

export const ENDPOINTS = {
  POSTS: `${API_BASE}/posts`,
  POST_BY_ID: (id: number | string): string => `${API_BASE}/posts/${id}`,
} as const;

export default ENDPOINTS;