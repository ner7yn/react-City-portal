import { BrowserRouter as Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Main } from "../pages/Main";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Profile } from "../pages/Profile";
import React from 'react';


export function UseRoutes() {
    return (
        <div className="main-container">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/me" element={<Profile />} />
                    </Route>
                </Routes>
        </div>
    )
}

const PrivateRoute = () => {
    const { isAuth } = useContext(AuthContext);
    // Проверяем наличие значения isAuth, а не на равенство true
    return isAuth ? <Outlet /> : <Navigate to={"/"} />;
}