import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import db from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const InputBar = () => {
    const [inputValue,setInputValue] = useState();
    const handleClick = async () =>{
        await addDoc(collection(db,"TestUsuario","Chats","mensajes"), {
            mensaje: inputValue,
            id: 'Walkeruru',
            time: 'Hace 1 min'
          });
          setInputValue(current => '');
    };

    return (
        <>
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Escribe un mensaje aqui"
                    inputProps={{ 'aria-label': 'Escribe un mensaje aqui' }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
                    <SendIcon />
                </IconButton>
            </Paper>
        </>
    )
}

export default InputBar