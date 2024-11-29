import { Dialog, DialogContent, DialogActions, InputLabel, FormControl, DialogTitle, TextField, IconButton, Select, MenuItem } from '@mui/material';
import BaseButton from '../BaseButton';
import CloseIcon from '@mui/icons-material/Close';
import { ApplicationCreate, getAllCategory, uploadImage } from '../../services/http.service';
import { useEffect, useState } from 'react';
import Toast from '../Toast';

export function CreateModall({ onClose, open }) {
    const [form, setForm] = useState({ title: "", text: "", teg: "", image: "" });
    const token = localStorage.getItem('token');
    const [tegs, setTegs] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: null });
    const [imageUploaded, setImageUploaded] = useState(false); // Добавляем состояние для отслеживания загрузки изображения

    useEffect(() => {
        const init = async () => {
            const res = await getAllCategory();
            setTegs(res); // Сохраняем весь объект категории, а не только имена
        }
        init();
    }, []);

    function openSnackbar(message) {
        setSnackbar({ message: message, open: true });
    }

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setForm((prev) => ({ ...prev, image: e.target.files[0] }));
            setImageUploaded(true); // Устанавливаем состояние, что изображение было загружено
        } else {
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    async function submit(event) {
        event.preventDefault();
        try {
            const resFile = await uploadImage(form.image, token);
            const File = "https://node-city-portal.onrender.com" + resFile.url;
            const res = await ApplicationCreate({
                title: form.title,
                text: form.text,
                tegId: form.teg, // Сохраняем id категории
                imageUrlBefore: File
            }, token);
            openSnackbar("Заявка успешна создана");
            onClose();
            window.location.reload();
        } catch {
            openSnackbar("Произошла ошибка при создании заявки");
        }
    }

    return (
        <>
            <Toast open={snackbar.open} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
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
                                color: 'black',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "400px",
                        maxWidth: "400px",
                        gap: "1rem",
                        marginTop: "15px",
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
                                {tegs.map((teg) => (
                                    <MenuItem key={teg._id} value={teg._id}>
                                        {teg.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <div className="flex justify-center mt-7 gap-2">
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
                                {imageUploaded && <p className='text-[1.125rem]'>Изображение загружено</p>}
                            </div>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        marginTop: '-1rem',
                    }}>
                        <BaseButton text='Создать заявку' onClick={submit} />
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}