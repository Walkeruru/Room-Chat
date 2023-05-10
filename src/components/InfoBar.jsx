import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

const InfoBar = (props) =>{
    return (
        <>
            <AppBar position="static" sx={{backgroundColor:props.bg}}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ flexGrow: 0, display: 'flex' }}>
                  <Tooltip title="Open settings">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: { xs: 46, md: 56 }, height: { xs: 46, md: 56 } }} />
                    </IconButton>
                  </Tooltip>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: 'flex',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                      alignItems: 'center',
                      marginLeft: '0.5rem'
                    }}
                  >
                    {props.texto}
                  </Typography>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>
    )
}

export default InfoBar