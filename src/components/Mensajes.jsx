import MensajeEnviado from "./MensajeEnviado";
import MensajeRecibido from "./MensajeRecibido";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

//styles imports
import Container from "@mui/material/Container";
import "../styles/mensaje.css";

const Mensajes = (props) => {
  const [datos, setDatos] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [datos]);

  useEffect(() => {
    let ignore = false; // evita el doble render
    async function fetchData() {
      const mensajes = query(
        collection(db, "TestUsuario", props.canal, "mensajes"),
        orderBy("time", "asc")
      );
      onSnapshot(mensajes, (doc) => {
        if (!ignore) {
          doc.docChanges().forEach((x) => {
            if (x.type === "added") {
              setDatos((prevState) => prevState.concat(x.doc.data()));
            }
          });
        }
      });
    }
    fetchData();
    return () => {
      ignore = true;
      setDatos([]);
    };
  }, [props.canal]);

  return (
    <>
      <Container className="contenedo_msj">
        {datos.map((dato) => {
          if (dato.id == props.user) {
            return (
              <MensajeEnviado
                mensaje={dato.mensaje}
                tiempo={dato.time}
                key={dato.key}
                src={dato.image}
              ></MensajeEnviado>
            );
          } else
            return (
              <MensajeRecibido
                mensaje={dato.mensaje}
                tiempo={dato.time}
                key={dato.key}
                src={dato.image}
                id={dato.id}
              ></MensajeRecibido>
            );
        })}
        <div ref={messagesEndRef} />
      </Container>
    </>
  );
};

export default Mensajes;
