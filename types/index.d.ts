declare interface I_AUTH_STORE {
  User: I_USER_SESSION | null;
  hydrated: boolean;
  setHydrated(): void;
  setUser: (user: I_USER_SESSION | null) => void;
  Login(email: string, password: string): Promise<I_USER_SESSION>;
  LogOut(): Promise<void>;
  Register(
    email: string,
    password: string
  ): Promise<{ name: string; email: string; id: string }>;
}

declare interface I_USER_SESSION {
  name: string;
  email: string;
  id: string;
  token: string;
}

declare interface I_LOGIN_FETCH {
  token: string;
  user: { id: string; name: string; email: string };
}

declare interface I_REGISTER_FETCH {
  token: string;
  user: { id: string; name: string; email: string };
}

declare interface I_CREATE_TASK_FETCH {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  description: string | null;
  createdBy: string;
}

declare type T_LOGOUT_FETCH = string;

declare interface I_TASKS_FETCH {
  success: boolean;
  data: T_TASK[];
}

declare interface I_USER_TASK_FETCH {
  success: boolean;
  data: {
    usersAssignedTasks: T_USER_TASK[];
    usersTasks: T_USER_TASK[];
  };
}

declare type T_USER_TASK = {
  id: string;
  name: string;
  isCompleted: boolean;
  description: string | null;
  user?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

declare type T_TASK = {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  };
  task: {
    id: string;
    name: string;
    isCompleted: boolean;
    description: string | null;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
