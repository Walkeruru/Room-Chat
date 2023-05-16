import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

//styles imports
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const InfoBar = (props) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getImageUrl = async () => {
      const docRef = doc(db, "TestUsuario", props.canal);
      const docSnap = await getDoc(docRef);
      setImageUrl(docSnap.data().url);
    };
    getImageUrl();
  }, [props.canal]);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: props.bg, marginBottom: "0.4em" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Avatar
                alt={props.canal}
                src={imageUrl}
                sx={{
                  width: { xs: 46, md: 56 },
                  height: { xs: 46, md: 56 },
                  p: 0,
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  alignItems: "center",
                  marginLeft: "0.5rem",
                }}
              >
                {props.canal}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default InfoBar;
