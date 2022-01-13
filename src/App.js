
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from './components/context/notes/NoteState';
import Alert  from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useState } from 'react';



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (<>
   <BrowserRouter>
   <Navbar title="iNoteBook"/>
   <Alert alert={alert}/>
   <div className= "container">
   <NoteState>


    <Routes>
    <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
    <Route path="/About" element={<About/>}>
    </Route>
    <Route path="/Login" element={<Login showAlert={showAlert}/>}>
    </Route>
    <Route path="/Signup" element={<Signup showAlert={showAlert}/>}>
    </Route>
    </Routes>
    </NoteState>
    </div>
  </BrowserRouter>,
      
  </>);
}

export default App;
