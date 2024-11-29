import React, { createContext, useEffect, useState, useContext } from "react";
import { getUserData } from "../services/http.service";
import { AuthContext } from "./AuthProvider";
import CircularProgress from "@mui/material/CircularProgress"; // Импортируем CircularProgress из MUI
import { Box } from "@mui/material"; // Импортируем Box для удобного позиционирования

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token?.length) {
        setIsLoading(false);
        return;
      }

      try {
        const resUser = await getUserData(token);
        if (!resUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        setUser(resUser);
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          localStorage.removeItem('is_admin');
          setAuth(false);
        }
        setIsLoading(false);
      }
    };

    init();
  }, [isAuth]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="10vh"
        height="100vh" // Высота на весь экран
      >
        <CircularProgress />
        <img src="logo.png" alt="Logo" className="mt-12 w-[400px]"/> 
      </Box>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
