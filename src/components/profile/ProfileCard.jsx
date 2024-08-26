import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { ApplicationDelete } from '../../services/http.service';
import { useEffect, useState } from 'react';
import Toast from '../Toast';
import BaseButton from '../BaseButton';

export function ProfileCard({application,openModal,admin}){
  const token = localStorage.getItem('token');
  const [snackbar, setSnackbar] = useState({ open: false, message: null });
  const [confirmDelete, setConfirmDelete] = useState(false);

  function openSnackbar(message) {
    setSnackbar({ message: message, open: true });
  }

  const DeleteApplication = async () => {
    try {
      const res = await ApplicationDelete(application._id, token);
      // Обработка ответа от сервера после удаления
      if (res.status === 200) {
        openSnackbar("Запись успешно удаленна");
        // Здесь можно обновить список заявок или выполнить другие необходимые действия
      } else {
        openSnackbar("Ошибка при удалении заявки");
      }
    } catch (error) {
      openSnackbar("Ошибка при удалении заявки");
    }
  };


    const formatDateTime = (dateString) => { 
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
      };
    return(
      <>
      <Toast open={snackbar.open} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
        <div className="flex w-[80vw] h-[20vh] gap-5 shadow-[0px_8px_20px_rgba(0,0,0,0.2)]">
            <img src={application.imageUrlBefore} alt="" className="w-[35%] h-full shadow-[8px_0px_11px_rgba(0,0,0,0.2)] object-cover object-center" />
            <div className=" flex w-full justify-between gap-5">
                <div className="">
                    <h2  className='p-0 m-0'>{application.title}</h2>
                    <p className='text-gray-500 -mt-2 mb-2'>{application.teg.name}</p>
                    <p className="line-clamp-2 overflow-hidden">{application.text}</p>
                    <p className='text-gray-500 mt-3'>{formatDateTime(application.updatedAt)}</p>
                </div>
                
     {admin ?(
      <>
      <div className="flex flex-col justify-between  items-end pt-2">
       {application.status === 'Новая' ? (
        <>
          <LoopIcon />
          <div className="flex items-end">
          <BaseButton text="Изменить статус" onClick={() => openModal(application.title, application)}/>
        </div>
        </>
      ) : application.status === 'Решена' ? (
        <>
          <CheckIcon/>
        </>
      ) : application.status === 'Отклонена' ? (
        <>
          <CloseIcon/>
        </>
      ) : null}
    </div>
      </>
     ) : (
      <>
      <div className="flex flex-col justify-between items-center p-2">
       {application.status === 'Новая' ? (
        <>
          <LoopIcon />
          <IconButton sx={{ color: '#C70000' }} onClick={() => openModal(application.title,application._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ) : application.status === 'Решена' ? (
        <>
          <CheckIcon/>
        </>
      ) : application.status === 'Отклонена' ? (
        <>
          <CloseIcon/>
        </>
      ) : null}
    </div>
      </>
     )}
            </div>
        </div>
        </>
    )
}  