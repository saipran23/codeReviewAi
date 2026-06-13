import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";


const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await api.get("/api/auth/me");

                setUser(response.data);
                setIsLogin(true);
            } catch {
                setUser(null);
                setIsLogin(false);
            }
        }


        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isLogin, setIsLogin, user, setUser }}
        >
            {children}
        </AuthContext.Provider>

    )

}

export function useAuth() {
    return useContext(AuthContext);
}
