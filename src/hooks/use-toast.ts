"use client";

import { toast, type ToastOptions } from "react-toastify";

export function useToast() {
  const success = (message: string, options?: ToastOptions) => {
    return toast.success(message, options);
  };

  const error = (message: string, options?: ToastOptions) => {
    return toast.error(message, options);
  };

  const info = (message: string, options?: ToastOptions) => {
    return toast.info(message, options);
  };

  const warning = (message: string, options?: ToastOptions) => {
    return toast.warning(message, options);
  };

  return { success, error, info, warning, toast };
}
