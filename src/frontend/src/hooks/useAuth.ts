import { AuthState } from "@/services/AuthState";
import { useContext } from "react";

export const useAuth = () => {
  const state = useContext(AuthState);

  return {
    authorized: state.user?.is_authenticated ?? false,
    user: state?.user,
  };
};
