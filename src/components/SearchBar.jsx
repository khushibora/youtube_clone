import{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper,IconButton
 } from '@mui/material';
import { ImportExport } from '@mui/icons-material';
 import { Search} from '@mui/icons-material';

const SearchBar = () => {
  return (
   <Paper
    component="from"
    onSubmit={() => {}}
    sx={{
        borderRadius:20,
        border: '1px solid #e3e3e3',
        pi:2,
        boxShadow: 'none',
        mr:{ sm:5 }
    }}
    >
    <input 
        className="search-bar"
        placeholder='Search...'
        value=""
        onCharge={() =>{}}
    />
    <IconButton type='submit' sx={{p:'10px', color: 'red' }}>
        <Search />
    </IconButton>
   </Paper>
  )
}

export default SearchBar