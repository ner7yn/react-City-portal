import React, { useState } from "react";

export const MainCard = ({ application }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

 const [image,setImage] = useState(application.imageUrlAfter);

 const handleMouseEnter = () => {
  setIsHovered(true);
  setImage(application.imageUrlBefore); // Установка нового URL-адреса изображения при наведении курсора
};

const handleMouseLeave = () => {
  setIsHovered(false);
  setImage(application.imageUrlAfter); // Возврат исходного URL-адреса изображения при уходе курсора
};


  return (
    <div
      className="main-card"
      style={{ 'background-image': `url(${image})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-[100%] h-[25%] bg-gradient-to-t from-[rgba(0,0,0,1)] from-10% via-[rgba(0,0,0,0.6)] via-75% to-[rgba(0,0,0,0)] p-3 relative">
        <h3 className="text-white text-2xl pt-6">{application.title}</h3>
        <p className="text-gray-500 text-lg">{application.teg}</p>
        <p className="text-gray-500 absolute bottom-3 right-3"> {formatDateTime(application.updatedAt)}</p>
      </div>
    </div>
  );
};