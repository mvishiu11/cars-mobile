import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
  } from "react";
  
  /**
   * We store the user's email and token in context.
   * `email` can be displayed anywhere.
   * `token` is used for authenticated requests.
   */
  interface AuthContextData {
    email: string | null;
    token: string | null;
    setEmail: (email: string | null) => void;
    setToken: (token: string | null) => void;
  }
  
  const AuthContext = createContext<AuthContextData>({
    email: null,
    token: null,
    setEmail: () => {},
    setToken: () => {},
  });
  
  interface AuthProviderProps {
    children: ReactNode;
  }
  
  export function AuthProvider({ children }: AuthProviderProps) {
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
  
    return (
      <AuthContext.Provider
        value={{ email, token, setEmail, setToken }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuthContext() {
    return useContext(AuthContext);
  }
  