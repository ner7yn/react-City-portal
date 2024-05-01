import {useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setAuth] = useState(!!localStorage.getItem("token")?.length);
  
    return <AuthContext.Provider value={{ isAuth, setAuth }}>{children}</AuthContext.Provider>;
  };
