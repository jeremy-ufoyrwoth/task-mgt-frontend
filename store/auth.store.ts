import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { BASE_URL } from "@/lib/utils";

const Login = async (
  email: string,
  password: string
): Promise<I_USER_SESSION> => {
  if (!email || !password) throw Error("Email and Password are required");

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json()) as I_LOGIN_FETCH;

  return { token: data.token, ...data.user };
};

const Register = async (
  email: string,
  password: string
): Promise<I_USER_SESSION> => {
  if (!email || !password) throw Error("Email and Password are required");

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json()) as I_REGISTER_FETCH;

  return { token: data.token, ...data.user };
};

const LogOutUser = async (): Promise<string> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = (await res.json()) as T_LOGOUT_FETCH;

  return data;
};

export const useAuthStore = create<I_AUTH_STORE>()(
  persist(
    immer((set) => ({
      hydrated: false,
      redirect: null,
      User: null,
      Register,
      Login,
      LogOut: async () =>
        set((state) => {
          state.User = null;
          LogOutUser();
        }),
      setHydrated: () =>
        set((state) => {
          state.hydrated = true;
        }),

      setUser: (user: I_USER_SESSION | null) =>
        set((state) => {
          state.User = user;
        }),
    })),
    {
      name: "task_mgt_auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
