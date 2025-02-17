import { BASE_URL, TryCatch } from "../utils";

export const createNewTask = TryCatch(async (params) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });

  const data = await res.json();

  return { data };
});

export const updateTask = TryCatch(async (params) => {
  const res = await fetch(`${BASE_URL}/tasks/${params.id}`, {
    method: "PATCH",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });

  const data = await res.json();

  return { data };
});

export const updateTaskStatus = TryCatch(async (params) => {
  const res = await fetch(`${BASE_URL}/tasks/${params.id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isCompleted: params?.isCompleted }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });

  const data = await res.json();

  return { data };
});

export const deleteTask = TryCatch(async (params) => {
  const res = await fetch(`${BASE_URL}/tasks/${params.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });

  const data = await res.json();

  return { data };
});

export const assignUserTask = TryCatch(async (params) => {
  const res = await fetch(`${BASE_URL}/task-assignments`, {
    method: "POST",
    body: JSON.stringify({ userId: params.userId, taskId: params.taskId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });

  const data = await res.json();

  return { data };
});
