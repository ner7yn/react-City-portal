import { Dialog, DialogContent, DialogActions } from '@mui/material';
import BaseButton from '../BaseButton';
import { ApplicationDelete } from '../../services/http.service';
import { useState } from 'react';
import Toast from '../Toast';

export function DeleteModal({ onClose, open, name, id }) {
    const token = localStorage.getItem('token');
    const [snackbar, setSnackbar] = useState({ open: false, message: null });
    
    function openSnackbar(message) {
        setSnackbar({ message: message, open: true });
    }

    async function submit(event) {
        event.preventDefault()
        try {
            const res = await ApplicationDelete(id, token);
            onClose();
            window.location.reload();
            openSnackbar("Заявка успешна удалена");
        } catch {
            openSnackbar("Произошла ошибка при удалении");
        }
    }
    return (
        <>
        <Toast open={snackbar.open} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
            <Dialog open={open} onClose={onClose}>
                <form onSubmit={submit}>
                    <DialogContent>
                        <div>
                            <h3 className='my-5 text-xl'>Вы уверены что хотите удалить заявку "{name}"?</h3>
                        </div>
                    </DialogContent>
                    <DialogActions sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px'
                    }}>
                        <BaseButton text="Да" onClick={submit} />
                        <BaseButton text="Нет" onClick={onClose} btnStyle="bg-black" type="button" />
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}