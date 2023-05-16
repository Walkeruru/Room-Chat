import ListaCanales from "./components/ListaCanales";
import InfoBar from "./components/InfoBar";
import InputBar from "./components/InputBar";
import Mensajes from "./components/Mensajes";
import UserBar from "./components/UserBar";
import LoginPage from "./components/LoginPage";
import { v4 } from "uuid";
import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Grid from "@mui/material/Grid";
import "./App.css";

function App() {
  const [currentCanal, setCurrentCanal] = useState("General"); //por deafult entra al canal general
  const [isLogin, setIsLogin] = useState(
    false || localStorage.getItem("loged")
  );
  const [userName, setUserName] = useState(
    "" || localStorage.getItem("userName")
  );
  const [userUrl, setUserUrl] = useState("" || localStorage.getItem("userUrl"));

  const handleCanal = (e) => {
    return setCurrentCanal(e.currentTarget.id);
  };

  const handleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        setUserName(user.displayName);
        setUserUrl(user.photoURL);
        setIsLogin(true);

        localStorage.setItem("loged", true);
        localStorage.setItem("userName", user.displayName);
        localStorage.setItem("userUrl", user.photoURL);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(error);
      });
  };

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLogin(null);
        setUserName(null);
        setUserUrl(null);
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  const handleGuestLogin = () => {
    setUserName(`Guest-${v4().split("-")[0]}`);
    setIsLogin(true);
  };

  return (
    <>
      {!isLogin && (
        <LoginPage
          btnLogin={handleLogin}
          btnGuest={handleGuestLogin}
        ></LoginPage>
      )}
      {isLogin && (
        <Grid container columns={14}>
          <Grid
            item
            xs={3}
            sm={2}
            md={3}
            sx={{ maxHeight: "100vh", overflowY: "auto" }}
            className="bar"
          >
            <UserBar
              userName={userName}
              imageUrl={userUrl}
              logoutBtn={handleLogOut}
            ></UserBar>
            <ListaCanales handleClick={handleCanal}></ListaCanales>
          </Grid>
          <Grid item xs={11} sm={12} md={11}>
            <Grid container item>
              <Grid item xs={14}>
                <InfoBar canal={currentCanal}></InfoBar>
              </Grid>
              <Grid item xs={14}>
                <Mensajes canal={currentCanal} user={userName}></Mensajes>
              </Grid>
              <Grid
                item
                xs={14}
                alignItems="flex-end"
                sx={{ marginLeft: "1em" }}
              >
                <InputBar canal={currentCanal} user={userName}></InputBar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default App;
