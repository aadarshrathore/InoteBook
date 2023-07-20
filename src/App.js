import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteBook from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Alert from "./components/Alert";
function App() {

  const [alert,setAlert] = useState(null);
  const showAlert  = (message,type)=>{
         setAlert({
          msg:message,
          type:type
         })
         setTimeout(()=>{
          setAlert(null)
         },1500)
  }

  return (
    <>

    <NoteBook>
    <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
      </Router>

    </NoteBook>
   
    
    
    </>
     

  );
}

export default App;
