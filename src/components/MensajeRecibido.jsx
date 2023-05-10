import '../styles/Mensaje.css';

const MensajeRecibido = (props) =>{
    return (
        <>
            <div className="mensaje-izq">
                    <div className="cuerpo_msj">
                        <div className="msj-texto">
                        {props.mensaje}
                        </div>
                        <span className="tiempo"><i className="icon-clock"></i> {props.tiempo}</span>
                    </div>
                </div>
        </>
    )
}

export default MensajeRecibido;