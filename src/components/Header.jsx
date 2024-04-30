import { useState } from "react";
import BaseButton from "./BaseButton";
import { AuthModal } from "./AuthModal";

export default function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const [modal,setModal] = useState({isOpen:false,type:"Вход"})
    function openModal(type) {
        setModal({ type: type, isOpen: true });
      }
    
      function closeModal() {
        setModal({ ...modal, isOpen: false });
      }
      
    return (
        <>
        <header className="flex items-center justify-between px-12 py-8">
            <div className="flex">
                <img src="../logo.png" alt="" className="cursor-pointer"></img>
            </div>
            {isAuth ? (
                <div className="flex gap-x-4">
                    <BaseButton text="Профиль" />
                    <BaseButton text="Выход" btnStyle="bg-black"/>
                </div>
            ) : (
                <div className="flex gap-x-4">
                    <BaseButton text="Вход" onClick={() => openModal('Вход')} />
            <BaseButton text="Регистрация" onClick={() => openModal('Регистрация')} />
                </div>
            )}
        </header>
        <AuthModal type={modal.type} open={modal.isOpen} onClose={closeModal} />
        </>
    );
}

