import React, { useState } from "react";

export const MainCard = ({application}) => {
  const [isHovered, setIsHovered] = useState(false);
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };
  return (
    <div
      className={`w-[23vw] h-[60vh] shadow-[10px_10px_23px_rgba(0,0,0,0.25)] flex items-end relative overflow-hidden transition-all duration-1000 ease-in-out bg-cover bg-center  ${
        isHovered
          ? "bg-[url('http://localhost:5000/uploads/test.jpg')]"
          : "bg-[url('https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666389923_30-mykaleidoscope-ru-p-klassnaya-priroda-oboi-32.jpg')]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[100%] h-[25%] bg-gradient-to-t from-[rgba(0,0,0,1)] from-10% via-[rgba(0,0,0,0.6)] via-75% to-[rgba(0,0,0,0)] p-3 relative">
        <h3 className="text-white text-2xl pt-6">{application.title}</h3>
        <p className="text-gray-500 text-lg">{application.teg}</p>
        <p className="text-gray-500 absolute bottom-3 right-3"> {formatDateTime(application.updatedAt)}</p>
      </div>
    </div>
  );
};