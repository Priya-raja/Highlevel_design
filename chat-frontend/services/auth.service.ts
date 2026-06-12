import { authApi } from "@/lib/api";
import { User } from "@/types/user";

interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await authApi.post<AuthResponse>("/auth/register", payload);

  return data.data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await authApi.post<AuthResponse>("/auth/login", payload);

  return data.data;
};

export const getMe = async (token: string) => {
  const { data } = await authApi.get<{ success: boolean; data: { user: User } }>(
    "/auth/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data.data.user;
};
