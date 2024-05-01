import { IconButton, Slide, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function Toast(props) {
    return (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={props.open}
          onClose={props.onClose}
          autoHideDuration={3000}
          TransitionComponent={Slide}
          message={
            <span style={{ color: 'white' }}>{props.message}</span> // Цвет текста белый
          }
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={props.onClose}
              sx={{ color: 'white' }} // Цвет иконки белый
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: '#C70000',
              color: 'white',
            },
          }}
        />
      );
}