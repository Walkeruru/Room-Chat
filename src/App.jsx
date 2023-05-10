import Grid from '@mui/material/Grid';
import ListaContactos from './components/ListaContactos';
import InfoBar from './components/InfoBar';
import InputBar from './components/InputBar';
import Mensajes from './components/Mensajes'
import './App.css';

function App() {

  return (
    <>
      <Grid container columns={14}>
        <Grid item xs={3} sm={2} md={3}>
          <ListaContactos></ListaContactos>
        </Grid>
        <Grid item xs={11} sm={12} md={11}>
          <Grid container item spacing={3}>
            <Grid item xs={14}>
              <InfoBar texto={'Usuario'}></InfoBar>
            </Grid>
            <Grid item xs={14}>
              <Mensajes></Mensajes>
            </Grid>
            <Grid item xs={14} alignItems="flex-end">
              <InputBar></InputBar>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default App
