
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



function App() {
  return (<>
   <BrowserRouter>
   <Navbar title="iNoteBook"/>
   <Alert message="This is amazing React course" />
   <div className= "container">
   <NoteState>


    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/About" element={<About/>}>
    </Route>
    </Routes>
    </NoteState>
    </div>
  </BrowserRouter>,
      
  </>);
}

export default App;
