import "../styles/login.css";

const LoginPage = (props) => {
  return (
    <>
      <div className="container">
        <div className="centralContainer">
          <div className="text">
            <h1>Bienvenidos a RoomChat</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              ea soluta ipsa fuga quas. Dignissimos quos corporis quas
              laboriosam ipsum. Perferendis doloremque officiis sint expedita
              aliquam, ut est illo nihil!
            </p>
            <p>Unete a la conversación!</p>
          </div>
          <div className="btnSide">
            <p>Inicia sesion aqui</p>
            <button onClick={props.btnLogin} className="login-with-google-btn">
              Google sign in
            </button>
            <div></div>
            <button onClick={props.btnGuest} className="login-btn">
              Try the app as guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
