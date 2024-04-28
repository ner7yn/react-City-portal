import { useState } from "react";
import BaseButton from "./BaseButton";


export default function Header() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <header className="flex items-center justify-between px-12 py-8">
            <div className="flex">
                <img src="../logo.png" alt=""></img>
            </div>
            {isAuth ? (
                <div className="flex gap-x-4">
                    <BaseButton text="Профиль" />
                    <BaseButton text="Выход" btnStyle="bg-black"/>
                </div>
            ) : (
                <div className="flex gap-x-4">
                    <BaseButton text="Вход" />
                    <BaseButton text="Регистрация" />
                </div>
            )}
        </header>
    );
}

