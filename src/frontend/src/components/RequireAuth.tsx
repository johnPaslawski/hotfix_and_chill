import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

interface IRequireAuth {
    children: React.ReactNode
}

const RequireAuth: React.FC<IRequireAuth> = ({children}) => {
    const {authorized} = useAuth();
    return authorized ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;