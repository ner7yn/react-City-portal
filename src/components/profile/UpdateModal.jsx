import {Dialog,DialogContent,DialogActions,Button,InputLabel,FormControl,DialogTitle,TextField,IconButton,Checkbox,FormControlLabel,Select,MenuItem, Input} from '@mui/material';
import BaseButton from '../BaseButton';
import CloseIcon from '@mui/icons-material/Close';
import { ApplicationCreate, ApplicationDelete, uploadImage } from '../../services/http.service';
import { useState } from 'react';

export function UpdateModal({onClose,open,name,application}){
    const token = localStorage.getItem('token');
    const [status,setStatus] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: null });


    function openSnackbar(message) {
        setSnackbar({ message: message, open: true });
      }

      function handleChange(event) {
        setStatus(event.target.value);
    }

    async function submit(event){
        event.preventDefault()
        try{
           
        }catch{
            openSnackbar("Произошла ошибка при создании заявки");
        }
    } 
    return(
        <>
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
                                name="teg" 
                                value={status} 
                                onChange={handleChange}
                            >
                                    <MenuItem value="Отклонена">
                                    Отклонена
                                    </MenuItem>
                                    <MenuItem value="Решена">
                                    Решена
                                    </MenuItem>
                            </Select>

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