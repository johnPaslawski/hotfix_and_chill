import React, { useCallback, useState } from "react";

export interface IUser {
  user_id: string;
  is_authenticated: boolean;
  user: string;
}

interface IAuthState {
  user: IUser | null;
  setUser: (user_id: string, user: string) => void;
  logout: () => void;
}

export const AuthState = React.createContext<IAuthState>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

interface IAuthStateProvider {
  children: React.ReactNode;
}

export const AuthStateProvider: React.FC<IAuthStateProvider> = ({
  children,
}) => {
  const [user, setUserState] = useState<IUser | null>(null);

  const setUser = useCallback(
    (user_id: string, user: string) =>
      setUserState({ user, user_id, is_authenticated: true }),
    []
  );
  const logout = useCallback(() => setUserState(null), []);

  return (
    <AuthState.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthState.Provider>
  );
};
