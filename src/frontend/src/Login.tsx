import Navbar from "@components/layout/Navbar";
import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router";

const Login: React.FC = () => {
  const { authorized } = useAuth();
  if (authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main>
      <Navbar />
    </main>
  );
};

export default Login;
