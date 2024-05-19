import {Dialog,DialogContent,DialogActions,Button,InputLabel,FormControl,DialogTitle,TextField,IconButton,Checkbox,FormControlLabel,Select,MenuItem, Input} from '@mui/material';
import BaseButton from '../BaseButton';
import CloseIcon from '@mui/icons-material/Close';
import { ApplicationCreate, ApplicationDelete, uploadImage } from '../../services/http.service';
import { useState } from 'react';

export function CreateModall({onClose,open}){
    const [form,setForm] = useState({title:"",text:"",teg:"",image:""})
    const token = localStorage.getItem('token');
    const [tegs,setTegs] = useState(["площадка","дом","мусор"]);
    const [snackbar, setSnackbar] = useState({ open: false, message: null });


    function openSnackbar(message) {
        setSnackbar({ message: message, open: true });
      }


      const handleChange = (e) => {
        if (e.target.type === 'file') {
          setForm((prev) => ({ ...prev, image: e.target.files[0] }));
        } else {
          setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
        console.log(form);
      };

    async function submit(event){
        event.preventDefault()
        try{
            const resFile = await uploadImage(form.image,token);
            console.log(resFile);
            const File = "http://localhost:5000" + resFile.url;
            const res = await ApplicationCreate({title:form.title,text:form.text,teg:form.teg,imageUrlBefore:File},token);
            openSnackbar("Заявка успешна создана");
            onClose();
            window.location.reload();
        }catch{
            openSnackbar("Произошла ошибка при создании заявки");
        }
    } 
    return(
        <>
            <Dialog open={open} onClose={onClose}>
                <form onSubmit={submit}>
                    <DialogTitle>
                        <h3>Создание заявки</h3>
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color:'black',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{
                        display:"flex",
                        flexDirection:"column",
                        minWidth:"400px",
                        maxWidth:"400px",
                        gap:"1rem",
                        marginTop:"15px",
                    }}>
                        <TextField 
                            label="Название" 
                            fullWidth 
                            name="title" 
                            value={form.title} 
                            onChange={handleChange}
                        />
                        <TextField 
                            label="Описание" 
                            fullWidth 
                            multiline 
                            rows={5} 
                            name="text" 
                            value={form.text} 
                            onChange={handleChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Категория</InputLabel>
                            <Select 
                                label="Категория" 
                                name="teg" 
                                value={form.teg} 
                                onChange={handleChange}
                            >
                                {tegs.map((teg, index) => (
                                    <MenuItem key={index} value={teg}>
                                        {teg}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div className="flex justify-center mt-7">
                                <label className="cursor-pointer bg-black text-white text-lg shadow-[4px_4px_11px_rgba(0,0,0,0.2)] py-2 px-4 w-[67%] block">
                                    Загрузить изображение
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        name="image" 
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap:'10px',
                        marginTop:'-1rem',
                    }}>
                        <BaseButton text='Создать заявку' onClick={submit}/>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}