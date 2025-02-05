import apiClient, { setAuthToken } from "../api/apiClient";

export async function register(email: string): Promise<{ email: string; token: string }> {
  const response = await apiClient.post("/customers", { email });

  const authHeader = response.headers["authorization"] || response.headers["Authorization"];
  if (!authHeader) {
    throw new Error("No Authorization header found");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Malformed Authorization header");
  }

  setAuthToken(token);

  return { email, token };
}

export async function login(email: string): Promise<{ email: string; token: string }> {
  const response = await apiClient.put("/customers/login", { email });

  const authHeader = response.headers["authorization"] || response.headers["Authorization"];
  if (!authHeader) {
    throw new Error("No Authorization header found");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Malformed Authorization header");
  }

  setAuthToken(token);

  return { email, token };
}