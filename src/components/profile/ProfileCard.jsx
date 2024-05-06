import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export function ProfileCard({application}){

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
      };
    return(
        <div className="flex w-[80vw] h-[20vh] gap-5 shadow-[0px_8px_20px_rgba(0,0,0,0.2)]">
            <img src="https://ic.pics.livejournal.com/liqht_in_mind/60442656/2517476/2517476_1000.jpg" alt="" className="w-[35%] h-full shadow-[8px_0px_11px_rgba(0,0,0,0.2)] object-cover object-center" />
            <div className=" flex w-full justify-between gap-5">
                <div className="">
                    <h2  className='p-0 m-0'>{application.title}</h2>
                    <p className='text-gray-500 -mt-2 mb-2'>{application.teg}</p>
                    <p className="line-clamp-2 overflow-hidden">{application.text}</p>
                    <p className='text-gray-500 mt-3'>{formatDateTime(application.updatedAt)}</p>
                </div>
                <div className="flex flex-col justify-between items-center p-2">
               {/* Используем несколько условных операторов для выбора иконки в зависимости от статуса */}
      {application.status === 'Новая' ? (
        <>
          <LoopIcon />
          <IconButton sx={{ color: '#C70000' }}>
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
            </div>
        </div>
    )
}  