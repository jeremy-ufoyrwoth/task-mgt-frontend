import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TryCatch = (fn: (params?: any) => any) => async (params?: any) => {
  try {
    return await fn(params);
  } catch (error: any) {
    let message = "Unexpected error";

    if (error?.message) message = error?.message || error;

    return { error: message || "Unexpected error" };
  }
};

export const BASE_URL = "http://localhost:4001/api";
