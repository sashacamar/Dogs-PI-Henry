import { Home, Landing, Form, Detail } from './views';
import NavBar from './components/NavBar/NavBar'
import { Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTemperaments, getDogs } from './redux/actions'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001";
//axios.defaults.baseURL = "";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
      //---Cargar todos los perros al montarse la app
      dispatch(getDogs());
      //---Cargar la lista de temperamentos de la base de datos
      dispatch(getTemperaments())
  },[]);

  const location = useLocation();

  return (
    <div className="App">
      <Route exact path='/' render={()=><Landing/>}/>

      {location.pathname !== '/' && <NavBar/>}

      <Route path='/home' render={()=><Home />}/>

      <Route path='/dog' render={()=><Detail/>}/>

      <Route path='/create' render={()=><Form/>}/>

    </div>
  );
}

export default App;
