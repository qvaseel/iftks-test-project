import { apiClient } from "@/shared/api/mainApi";
import type { GetUsersRequestParams, GetUsersResponse } from "../model";

export function getUsers({
  limit,
  skip,
  sortBy,
  order,
  filter,
}: GetUsersRequestParams): Promise<GetUsersResponse> {
  const searchParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy && order) {
    searchParams.set("sortBy", sortBy);
    searchParams.set("order", order);
  }

  if (filter) {
    searchParams.set("key", filter.key);
    searchParams.set("value", filter.value);
  }

  const endpoint = filter ? "/users/filter" : "/users";

  return apiClient<GetUsersResponse>(`${endpoint}?${searchParams.toString()}`);
}
