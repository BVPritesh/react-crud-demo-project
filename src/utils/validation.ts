export type FormErrors = { title?: string; body?: string };

export const titleRegex = /^[A-Za-z\s]+$/; // letters and spaces only
export const bodyRegex = /^[A-Za-z0-9\s]+$/; // letters, numbers and spaces only

export const validatePostForm = (title: string, body: string): FormErrors => {
  const errors: FormErrors = {};

  const t = title?.trim() ?? "";
  const b = body?.trim() ?? "";

  if (!t) {
    errors.title = "Post title is required";
  } else if (!titleRegex.test(t)) {
    errors.title = "Title must contain letters and spaces only";
  }

  if (!b) {
    errors.body = "Post body is required";
  } else if (!bodyRegex.test(b)) {
    errors.body = "Body may contain only letters, numbers and spaces";
  }

  return errors;
};