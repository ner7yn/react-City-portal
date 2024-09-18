import { Dialog, DialogContent, DialogTitle, Select, MenuItem, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import BaseButton from '../BaseButton';
import CloseIcon from '@mui/icons-material/Close';
import { createCategory, deleteCategory, getAllCategory } from "../../services/http.service";


export function CategoryModal({ onClose, Open }) {
    const [action, setAction] = useState("Добавить" | "Удалить");
    const act = ["Добавить", "Удалить"];
    const [category, setCategory] = useState("");
    const [tegs, setTegs] = useState([]);
    const token = localStorage.getItem('token');
    const [snackbar, setSnackbar] = useState({ open: false, message: null });

    useEffect(() => {
        const init = async () => {
            const res = await getAllCategory();
            setTegs(res);
        }
        init();
    }, []);

    async function DeleteCategory(event) {
        event.preventDefault()
        try{
            const res = await deleteCategory(category,token)
            onClose()
            window.location.reload();
            openSnackbar(res.meesage);
        }catch{
            openSnackbar("Что-то пошло не так ")
        }
    }


    async function CreateCategory(event) {
        event.preventDefault()
        try{
            const res = await createCategory({name:category},token)
            onClose()
            window.location.reload();
            openSnackbar(res.meesage);
        }catch{
            openSnackbar("Что-то пошло не так ")
        }
    }

    function openSnackbar(message) {
        setSnackbar({ message: message, open: true })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'action') {
            setAction(value);
            if (value === 'Добавить') {
                setCategory(''); // Очищаем категорию при смене действия на "Добавить"
            }
        } else if (name === 'category') {
            setCategory(value);
        }
    };



    return (
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
                                color: 'black',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{
                        fontSize: "25px",
                        minWidth: "400px",
                        maxWidth: "400px",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "10px"
                    }}>
                        <Select
                            label="Категория"
                            name="action"
                            value={action}
                            onChange={handleChange}
                            sx={{
                                minWidth: "130px"
                            }}
                        >
                            {act.map((action, index) => (
                                <MenuItem key={index} value={action}>
                                    {action}
                                </MenuItem>
                            ))}
                        </Select>
                        {action === "Удалить" ? (
                            <div className="flex items-center flex-col gap-3">
                                <Select
                                    label="Категория"
                                    name="category"
                                    value={category} 
                                    onChange={handleChange}
                                    sx={{
                                        minWidth: "200px",
                                        maxWidth: ""
                                    }}
                                >
                                    {tegs.map((action, index) => (
                                        <MenuItem key={action._id} value={action._id}>
                                            {action.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <BaseButton text='Удалить' onClick={DeleteCategory}/>
                            </div>
                        ) : (
                            <div className="flex items-center flex-col gap-3">
                                <TextField
                                label="Категория"
                                name="category"
                                value={category} 
                                onChange={handleChange}
                                sx={{
                                    minWidth: "200px",
                                    maxWidth: ""
                                }}
                                >

                                </TextField>
                                <BaseButton text='Добавить'  onClick={CreateCategory}/>
                            </div>
                        )}
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}