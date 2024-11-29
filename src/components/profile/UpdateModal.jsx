import {Dialog,DialogContent,DialogActions,InputLabel,FormControl,Select,MenuItem} from '@mui/material';
import BaseButton from '../BaseButton';
import { ApplicationUpdateStatus, uploadImage } from '../../services/http.service';
import { useState } from 'react';
import Toast from '../Toast';

export function UpdateModal({onClose,open,name,application}){
    const token = localStorage.getItem('token');
    const [form,setForm] = useState({status:"",image:""});
    const [snackbar, setSnackbar] = useState({ open: false, message: null });
    const [imageUploaded, setImageUploaded] = useState(false);

    function openSnackbar(message) {
        setSnackbar({ message: message, open: true });
      }

      const handleChange = (e) => {
        if (e.target.type === 'file') {
          setForm((prev) => ({ ...prev, image: e.target.files[0] }));
          setImageUploaded(true);
        } else {
          setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
      };

    async function submit(event){
        event.preventDefault()
        try{
            if(form.status === "Решена"){
            const resFile = await uploadImage(form.image,token);
            const File = "https://node-city-portal.onrender.com" + resFile.url;
            const res = await ApplicationUpdateStatus(application._id,{title:application.title,text:application.text,teg:application.teg,status:form.status,imageUrlBefore:application.imageUrlBefore,imageUrlAfter:File},token);
            onClose();
            window.location.reload();
            openSnackbar("Статус заявки успешно изменён");
        }else{
            const res = await ApplicationUpdateStatus(application._id,{title:application.title,text:application.text,teg:application.teg,status:form.status,imageUrlBefore:application.imageUrlBefore,imageUrlAfter:"отклонена"},token);
            onClose();
            window.location.reload();
            openSnackbar("Статус заявки успешно изменён");
        }
        }catch{
            openSnackbar("Произошла ошибка при изменении статуса заявки");
        }
    } 
    return(
        <>
         <Toast open={snackbar.open} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
            <Dialog open={open} onClose={onClose}>
                <form onSubmit={submit}>
                    <DialogContent sx={{
                        display:"flex",
                        alignItems:"center",
                        flexDirection:"column",
                        minWidth:"400px",
                        maxWidth:"400px",
                        gap:"1.5rem",
                        marginTop:"15px",
                    }}>
                        <h3 className='text-xl'>Смена статуса заяки “{name}”</h3>
                        <FormControl>
                            <InputLabel>Категория</InputLabel>
                            <Select 
                             sx={{
                                minWidth:"200px",
                                maxHeight:"50px",
                                marginBottom:"1rem",
                            }}
                                label="Категория" 
                                name="status" 
                                value={form.status} 
                                onChange={handleChange}
                            >
                                    <MenuItem value="Отклонена">
                                    Отклонена
                                    </MenuItem>
                                    <MenuItem value="Решена">
                                    Решена
                                    </MenuItem>
                            </Select>
                            {form.status === "Решена" ?(
                                <div className="flex justify-center flex-col items-center gap-1">
                                <label className="cursor-pointer text-black text-lg shadow-[4px_4px_11px_rgba(0,0,0,0.2)] py-2 px-4 w-[100%] block">
                                    Загрузить изображение
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        name="image" 
                                        onChange={handleChange}
                                    />
                                </label>
                                {imageUploaded && <p className='text-sm'>Изображение загружено</p>}
                            </div>
                            ):(null)}
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap:'10px',
                        marginTop:'-1rem',
                    }}>
                        <BaseButton text='Сохранить' onClick={submit}/>
                        <BaseButton text='Отменить' onClick={onClose} btnStyle="bg-black" type="button"/>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}