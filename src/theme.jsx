// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Установите тему на светлую
    primary: {
      main: '#1976de', // Ваш основной цвет
    },
    secondary: {
      main: '#dc004e', // Ваш вторичный цвет
    },
    // Вы можете настроить другие цвета, если необходимо
  },
  // Вы можете настроить другие аспекты темы, если необходимо
});

export default theme;