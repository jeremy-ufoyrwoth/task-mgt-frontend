import { BASE_URL, TryCatch } from "../utils";

export const loginUser = TryCatch(async (params) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return { data };
});

export const registerUser = TryCatch(async (params) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return { data };
});
