import { useContext, useState } from "react";
import BaseButton from "./BaseButton";
import { AuthModal } from "./AuthModal";
import { AuthContext } from "../context/AuthProvider";
import { UserContext } from "../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const { isAuth, setAuth } = useContext(AuthContext);
    const [modal,setModal] = useState({isOpen:false,type:"Вход"})
    function openModal(type) {
        setModal({ type: type, isOpen: true });
      }
    
      function closeModal() {
        setModal({ ...modal, isOpen: false });
      }

      function logout() {
        setAuth(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("is_admin");
        localStorage.removeItem("user_id");
        window.location.reload();
      }

      function routeTo(path) {
        navigate(path);
      }

    return (
        <>
        <header className="flex items-center justify-between px-12 py-8">
            <div className="flex">
                <img src="../logo.png" alt="" className="cursor-pointer" onClick={() => routeTo("",)}></img>
            </div>
            {isAuth ? (
                <div className="flex gap-x-4">
                    <BaseButton text="Профиль" onClick={() => routeTo("me")} />
                    <BaseButton text="Выход" btnStyle="bg-black"onClick={logout}/>
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

