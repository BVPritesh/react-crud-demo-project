import { useCallback, useMemo, useRef, useState } from "react";

export type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<ToastType>("success");
  const [visible, setVisible] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const hideToast = useCallback((): void => {
    setVisible(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showToast = useCallback((msg: string, t: ToastType = "success", ms = 3000): void => {
    setMessage(msg);
    setType(t);
    setVisible(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setVisible(false), ms) as unknown as number;
  }, []);

  const Toast = useMemo(
    () =>
      visible ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-4 top-4 px-4 py-2 rounded shadow z-50 text-white ${
            type === "error" ? "bg-red-600" : type === "info" ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {message}
        </div>
      ) : null,
    [visible, message, type]
  );

  return {
    showToast,
    hideToast,
    toastMessage: message,
    isToastVisible: visible,
    Toast,
  } as const;
};

export default useToast;