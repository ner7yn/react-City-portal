import { Dialog, DialogContent, DialogTitle,Select, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";
import BaseButton from '../BaseButton';
import CloseIcon from '@mui/icons-material/Close';
import { Category } from "@mui/icons-material";


export function CategoryModal({onClose,Open}){
    const [category,setCategory] = useState("");
    const [tegs,setTegs] = useState(["площадка","дом","мусор"]);
    const token = localStorage.getItem('token');
    const [snackbar, setSnackbar] = useState({ open: false, message: null });

    function openSnackbar(message){
        setSnackbar({message:message,open:true})
    }

    const handleChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

    
    return(
        <>
        <Dialog open={Open} onClose={onClose}>
            <form>
                <DialogTitle>
                <h3>Редактирование категорий</h3>
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
                <DialogContent>
                <Select 
                                label="Категория" 
                                name="teg" 
                                value={category} 
                                onChange={handleChange}
                            >
                                {tegs.map((teg, index) => (
                                    <MenuItem key={index} value={teg}>
                                        {teg}
                                    </MenuItem>
                                ))}
                            </Select>
                </DialogContent>
            </form>
        </Dialog>
        </>
    )
}