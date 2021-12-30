
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";



function App() {
  return (<>
   <BrowserRouter>
   <Navbar/>


    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/About" element={<About/>}>
    </Route>
    </Routes>
  </BrowserRouter>,
      
  </>);
}

export default App;
