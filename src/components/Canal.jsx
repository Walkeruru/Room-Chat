import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import '../styles/listaCanales.css'


const Canal = (props) => {
  return (
    <Box onClick={props.handleClick} id={props.name}>
      <ListItem alignItems="flex-start" className="canalContainer">
        <ListItemAvatar>
          <Avatar
            alt={props.name}
            src={props.src}
            sx={{ width: { xs: 46, md: 56 }, height: { xs: 46, md: 56 } }}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{
            display: { xs: "none", md: "block", lg: "block" },
            marginLeft: "1em",
            alignSelf: "center",
          }}
          primary={props.name}
          secondary={
            <Typography>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sobre:
              </Typography>
              {props.info}
            </Typography>
          }
        />
      </ListItem>
      <Divider
        variant="inset"
        component="li"
        sx={{ display: { xs: "none", md: "block", lg: "block" } }}
      />
    </Box>
  );
};

export default Canal;
