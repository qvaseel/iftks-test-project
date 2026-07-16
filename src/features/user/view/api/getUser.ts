import type { User } from "@/entities/user";
import { apiClient } from "@/shared/api/mainApi";

export function getUser(userId: number): Promise<User> {
  return apiClient<User>(`/users/${userId}`);
}
