const API_URL = "https://dummyjson.com";

export async function apiClient<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
