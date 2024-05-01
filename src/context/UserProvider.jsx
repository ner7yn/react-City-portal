import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../services/http.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token?.length) return;
      const resUser = await getUserData(token);
      if (!resUser) return;
      setUser(resUser);
    };

    init();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};