import { apiClient } from "./axios";
import type { AxiosRequestConfig } from "axios";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const response = await apiClient.get<ApiResponse<T>>(url, config);
  return response.data;
}

export async function getPaginated<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<PaginatedResponse<T>> {
  const response = await apiClient.get<PaginatedResponse<T>>(url, config);
  return response.data;
}

export async function post<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.post<ApiResponse<T>>(url, body, config);
  return response.data;
}

export async function put<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.put<ApiResponse<T>>(url, body, config);
  return response.data;
}

export async function patch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.patch<ApiResponse<T>>(url, body, config);
  return response.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const response = await apiClient.delete<ApiResponse<T>>(url, config);
  return response.data;
}
