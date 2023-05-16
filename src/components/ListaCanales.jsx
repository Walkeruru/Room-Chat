import Canal from "./Canal";
import { useState, useEffect } from "react";
import { db, uploadFile } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { MuiFileInput } from "mui-file-input";

//styles imports
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Add from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ListaCanales = (props) => {
  const [datos, setDatos] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    let ignore = false; // evita el doble render
    async function fetchData() {
      const canales = query(
        collection(db, "TestUsuario"),
        orderBy("creationDate", "asc")
      );
      onSnapshot(canales, (doc) => {
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
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    let result;
    if (file != null) {
      result = await uploadFile(file);
    } else result = "";
    setOpen(false);
    await setDoc(doc(db, "TestUsuario", name), {
      id: name,
      info: info,
      key: uuidv4(),
      url: result,
      creationDate: Date.now(),
    });
    setFile((current) => null);
  };

  const handleChange = (e) => {
    setFile(e);
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: { xs: 100, md: 360 } }}>
        <ListItem>
          <IconButton onClick={handleClickOpen}>
            <Add />
          </IconButton>
        </ListItem>
        {datos.map((dato) => {
          return (
            <Canal
              name={dato.id}
              info={dato.info}
              key={dato.key}
              src={dato.url}
              handleClick={props.handleClick}
            ></Canal>
          );
        })}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Canal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agrega un canal especificando su nombre y contenido
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="info"
            label="Contenido"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setInfo(e.target.value)}
          />
          <DialogContentText sx={{ marginTop: "1em" }}>
            Agrega una portada al canal
          </DialogContentText>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            content="portada del Canal"
          >
            <MuiFileInput
              value={file}
              onChange={handleChange}
              size="small"
              sx={{ display: "none" }}
            />
            <PhotoCamera />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListaCanales;
