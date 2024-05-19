import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../services/http.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Добавляем флаг загрузки

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (!token?.length) {
        setIsLoading(false); // Устанавливаем флаг загрузки в false, если токен отсутствует
        return;
      }
      const resUser = await getUserData(token);
      if (!resUser) {
        setIsLoading(false); // Устанавливаем флаг загрузки в false, если пользователь не получен
        return;
      }
      setUser(resUser);
      setIsLoading(false); // Устанавливаем флаг загрузки в false после получения пользователя
    };

    init();
  }, []);

  // Проверяем, что user не null перед рендерингом дочерних компонентов
  if (isLoading) {
    return <div>Загрузка...</div>; // Или любой другой компонент, который будет отображаться пока user не инициализирован
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};