import Navbar from "@components/layout/Navbar";
import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router";
import { useCallback, type FormEvent } from "react";

const Login: React.FC = () => {
  const { authorized, setUser } = useAuth();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setUser("123", "user");
    },
    [setUser]
  );

  if (authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main>
      <Navbar />

      <div className="flex flex-col items-center p-8">
        <form onSubmit={onSubmit} className="bg-white border p-8 rounded-xl border-gray-300">
          <h2 className="font-bold text-center text-4xl">Login</h2>
        </form>
      </div>
    </main>
  );
};

export default Login;
