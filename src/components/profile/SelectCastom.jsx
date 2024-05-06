import {MenuItem, FormControl, InputLabel,styled,Select} from '@mui/material';


const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-select': {
      borderRadius: '0px',
      padding: '12px 16px',
      boxShadow: '4px 4px 11px rgba(0,0,0,0.2)',
    },
    '& .MuiSelect-icon': {
      right: '10px',
    },
  }));


export default function SelectCastom({status,selectedStatus,handleStatusChange }){
 return(   <FormControl sx={{ 
    minWidth: 160,
    minHeight:40,
 }}>
<InputLabel id="status-label"></InputLabel>
<StyledSelect
labelId="status-label"
id="status-select"
value={selectedStatus}
onChange={handleStatusChange}
>
{status.map((status, index) => (
  <MenuItem key={index} value={status}>
    {status}
  </MenuItem>
))}
</StyledSelect>
</FormControl>
)};