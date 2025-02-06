import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { register, login } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

type AuthData = { email: string; token: string };

// REGISTER HOOK
export function useRegister(): UseMutationResult<AuthData, Error, string, unknown> {
  const { setEmail, setToken } = useAuthContext();

  return useMutation<AuthData, Error, string>({
    mutationFn: async (email: string) => {
      const result = await register(email);
      // Store in context
      setEmail(result.email);
      setToken(result.token);
      return result;
    },
  });
}

// LOGIN HOOK
export function useLogin(): UseMutationResult<AuthData, Error, string, unknown> {
  const { setEmail, setToken } = useAuthContext();

  return useMutation<AuthData, Error, string>({
    mutationFn: async (email: string) => {
      const result = await login(email);
      setEmail(result.email);
      setToken(result.token);
      return result;
    },
  });
}
