import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import type { ApiErrorResponse } from "@/types/api";

const baseURL = env.isServer
  ? (env.server.INTERNAL_API_BASE_URL ?? env.client.NEXT_PUBLIC_API_BASE_URL)
  : env.client.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const traceId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `trace-${Date.now()}`;
      config.headers.set("x-correlation-id", traceId);
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const errorResponse: ApiErrorResponse = {
      success: false,
      message:
        error.response?.data?.message ?? error.message ?? "An unexpected network error occurred",
      statusCode: error.response?.status ?? 500,
      errorCode: error.response?.data?.errorCode ?? error.code,
      errors: error.response?.data?.errors,
      timestamp: new Date().toISOString(),
    };

    return Promise.reject(errorResponse);
  }
);
