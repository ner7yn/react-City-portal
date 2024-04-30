/**
 * Функция AuthModal в JavaScript React создает диалоговое окно для аутентификации пользователя с
 * полями формы для входа в систему, электронной почты, пароля и флажка соглашения, включая проверку
 * полей ввода.
 */
import {Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,IconButton,Checkbox,FormControlLabel,} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState,useEffect } from "react";

export function AuthModal({type, open, onClose }) {
    const [repeatPassword, setRepeatPassword] = useState("");
    const [form, setForm] = useState({ FIO: "",login:"", email: "",password: "" });
    const [loading, setLoading] = useState(false);
    const [agree, setAgree] = useState(true);
    const [FIOError, setFIOError] = useState(false);
    const [MailError, setMailError] = useState(false);
    const[loginError,setLoginError] = useState(false);
    const[passwordError,setPasswordError] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        if(repeatPassword === ""){
            setHasErrors(true)
        }else{
            const hasEmptyFields = Object.values(form).some(value => value === "");
            setHasErrors(hasEmptyFields || FIOError || MailError || loginError || passwordError);
        }}, [form, FIOError, MailError, loginError, passwordError]);

    useEffect(() => {
        if (form.FIO.length > 0) {
            const isCyrillic = /^[А-Яа-я\s-]*$/.test(form.FIO);
            setFIOError(!isCyrillic);
          } else {
            setFIOError(false);
          }
      }, [form.FIO]);
    
      const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
        if (form.password !== e.target.value) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
      };

      useEffect(() => {
        if (form.email.length > 0) {
            const isMail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
            setMailError(!isMail);
          } else {
            setMailError(false);
          }
      }, [form.email]);

      useEffect(() => {
        if (form.login.length > 0) {
            const isLogin =   /^[A-Za-z]*$/.test(form.login);
            setLoginError(!isLogin);
          } else {
            setLoginError(false);
          }
      }, [form.login]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  };
    function close() {
        onClose();
        setForm({ FIO: "",login:"", email: "",password: "" });
        setLoading(false);
      }

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {type}
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
            fontSize:"25px",
            minWidth:"450px",
            maxWidth:"450px",
        }}>
          <TextField
            margin="dense"
            name="login"
            label="Логин"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.login}
            error={loginError}
            helperText={loginError && "Логин должен содержать только латинские символы"}
          />
          {type === 'Регистрация' && (
            <>
            <TextField
              margin="dense"
              name="email"
              label="Почта"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleChange}
              value={form.email}
              error={MailError}
              helperText={MailError && "Введите корректую почту"}
            />
            <TextField
            autoFocus
            margin="dense"
            name="FIO"
            label="ФИО"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.FIO}
            error={FIOError}
            helperText={FIOError && "Текст должен быть на кириллице"}
          />
          </>
          )}
          <TextField
            margin="dense"
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={form.password}
          />
           {type === 'Регистрация' &&
         ( <>
         <TextField
            margin="dense"
            name="password"
            label="Повторите пароль"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleRepeatPasswordChange}
            value={repeatPassword}
            error={passwordError}
            helperText={passwordError && "пароль не совпадает"}
          />
         <FormControlLabel
            control={
              <Checkbox
                checked={agree}
                onChange={handleAgreeChange}
                name="agree"
                color="primary"
              />
            }
            label="Согласие на обработку персональных данных"
          />
          </>)}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center'}}>
        <Button
        type="submit"
        disabled={loading || !agree || hasErrors}
        variant="contained"
      >
        Отправить
      </Button>
        </DialogActions>
      </Dialog>
    );
  }