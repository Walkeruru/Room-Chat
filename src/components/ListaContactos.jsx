import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Contacto from './Contacto';
import { Add } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import db from '../firebase';
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";

const ListaContactos = () => {
    const [datos, setDatos] = useState([])

    useEffect(() => {
        let ignore = false; // evita el doble render
        async function fetchData() {
            const mensajes = query(collection(db, 'TestUsuario'))
            const querySnapshot = await getDocs(mensajes);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                if (!ignore) {
                    setDatos(prevState => prevState.concat(doc.data()))
                }
            });
        }
        fetchData();
        return () => {
            ignore = true;
        }
    }, [])
    return (
        <>
            <List sx={{ width: '100%', maxWidth: { xs: 100, md: 360 } }}>
            {datos.map(dato => { 
                return <Contacto name={dato.id} info={dato.info}></Contacto>
            })}
            <ListItem>
                <IconButton>
                    <Add />
                </IconButton>
            </ListItem>
            </List>
        </>
    )
}

export default ListaContactos