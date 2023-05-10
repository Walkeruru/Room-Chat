import MensajeEnviado from './MensajeEnviado';
import MensajeRecibido from './MensajeRecibido';
import db from '../firebase';
import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import '../styles/Mensaje.css';
import { useEffect, useState } from 'react';

const Mensajes = () => {
    const [datos, setDatos] = useState([])

    useEffect(()=>{
        let ignore = false; // evita el doble render
        async function fetchData() {
            const mensajes = query(collectionGroup(db, 'mensajes'))
            onSnapshot(mensajes,(doc) => {
                if (!ignore) {
                    doc.docChanges().forEach(x =>{
                        console.log(x);
                        if(x.type==='added'){
                            setDatos(prevState => prevState.concat(x.doc.data()))
                        }
                    })
                  }
            })
        }
        fetchData();
        return () => {
            ignore = true;
          }
    },[])

    return (
        <>
            <div className="contenedo_msj">
                {datos.map(dato => {
                   if(dato.id == 'Walkeruru'){
                    return <MensajeEnviado mensaje={dato.mensaje} tiempo={dato.time} key={crypto.randomUUID()}></MensajeEnviado>
                   }else return <MensajeRecibido mensaje={dato.mensaje} tiempo={dato.time} key={crypto.randomUUID()}></MensajeRecibido>
                })}
            </div>
        </>
    )
}

export default Mensajes