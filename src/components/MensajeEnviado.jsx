import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "../dayjs/dayjsES";
import { useEffect } from "react";
import { useState } from "react";
import "../styles/mensaje.css";

//days config
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", locale);

const MensajeEnviado = (props) => {
  const [time, setTime] = useState(dayjs(props.tiempo).fromNow());

  useEffect(() => {
    //interval que actualiza el texto desde que se envio el mensaje
    let intervalTime = setInterval(() => {
      setTime(dayjs(props.tiempo).fromNow());
    }, 60000);
  }, []);

  return (
    <>
      <div className="mensaje-der">
        <div className="cuerpo_msj">
          {props.src != "" && (
            <img className="imgMensaje" src={props.src}></img>
          )}
          <div className="msj-texto">{props.mensaje}</div>
          <span className="tiempo">
            <i className="icon-clock"></i>
            {time}
          </span>
        </div>
      </div>
    </>
  );
};

export default MensajeEnviado;
