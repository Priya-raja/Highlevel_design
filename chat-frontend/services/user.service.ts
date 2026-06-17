import { authApi } from "@/lib/api";
import { User } from "@/types/user";

export const getUsers = async (token: string) => {
  const { data } = await authApi.get<{
    success: boolean;
    data: { users: User[] };
  }>("/auth/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.users;
};