import '../styles/Mensaje.css';

const MensajeEnviado = (props) =>{
    return (
        <>
             <div className="mensaje-der">
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

export default MensajeEnviado;