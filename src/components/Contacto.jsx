import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Contacto = (props) => {

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={props.name} src="/static/images/avatar/1.jpg" sx={{ width: { xs: 46, md: 56 }, height: { xs: 46, md: 56 } }} />
                </ListItemAvatar>
                <ListItemText sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}
                    primary={props.name}
                    secondary={
                        <div>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Sobre:
                            </Typography>
                            {props.info}
                        </div>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }} />
        </>
    )
}

export default Contacto;