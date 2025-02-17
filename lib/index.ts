"use client";

import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "./utils";
import { useAuthStore } from "@/store/auth.store";

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { User } = useAuthStore();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${User?.token}`,
        },
      });

      const data = await result.json();

      setData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
