import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check auth status on mount
        axios.get(`${API}/user/checkAuth`, { withCredentials: true })
            .then(res => {
                setAuthenticated(res.data.status); // true if logged in
                setUser(res.data.user);
                setLoading(false);
            })
            .catch(err => {
                console.error("Auth check error:", err);
                setAuthenticated(false);
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, loading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
