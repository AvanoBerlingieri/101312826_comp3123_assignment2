import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RedirectRoute({ children }) {
    const { authenticated, loading } = useAuth();

    if (loading) return <p>Loading...</p>; // wait until auth check finishes

    return authenticated ? children : <Navigate to="/" />;
}
