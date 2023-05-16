import { useState } from "react";
import { db, uploadFile } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { MuiFileInput } from "mui-file-input";
import { collection, addDoc } from "firebase/firestore";

//styles importss
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import "../styles/mensaje.css";

const InputBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [addedPic, setAddedPic] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let result;
      if (file != null) {
        result = await uploadFile(file);
      } else result = "";
      await addDoc(collection(db, "TestUsuario", props.canal, "mensajes"), {
        mensaje: inputValue,
        id: props.user,
        time: Date.now(),
        key: uuidv4(),
        image: result,
      });
      setInputValue((current) => "");
      setFile((current) => null);
      setAddedPic((current) => null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (file == null) {
      setFile(e);
      setAddedPic(1);
    } else {
      alert("Solo se puede subir una imagen por mensaje");
    }
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          marginRight: "1em",
        }}
        onSubmit={handleSubmit}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <MuiFileInput
            value={file}
            onChange={handleChange}
            size="small"
            sx={{ display: "none" }}
          />
          <Badge badgeContent={addedPic} color="primary">
            <PhotoCamera />
          </Badge>
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Escribe un mensaje aqui"
          inputProps={{ "aria-label": "Escribe un mensaje aqui" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="send">
          <SendIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default InputBar;
