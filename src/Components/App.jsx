import React, {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Celulares from "./Celulares";
import Juegos from "./Juegos";
import NotFound from "./NotFound";
import Menu from "./Menu";
import CelularesForm from "./CelularesForm";
import JuegosForm from "./JuegosForm";





function App(){
    
    const[apiCelulares, setApiCelulares] = useState("https://denny2023.azurewebsites.net/api/celulares") 
    console.log(setApiCelulares)
    const[apiJuegos, setApiJuegos] = useState("https://denny2023.azurewebsites.net/api/juegos") 
    console.log(apiJuegos)
    console.log(setApiJuegos)

   
   
    return(
    
        <div>
            <BrowserRouter>
            <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/celulares" element={<Celulares api= {apiCelulares} />} />
                    <Route path="/celulares/add" element={<CelularesForm api={apiCelulares} />} />
                    <Route path="/celulares/edit/:id" element={<CelularesForm api={apiCelulares} />} />
                    < Route path ="/celulares/delete/:id" element = {<CelularesForm del={true} api={apiCelulares} />} />
                    <Route path="/juegos" element={<Juegos api={apiJuegos} />} />
                    <Route path="/juegos/add" element={<JuegosForm api={apiJuegos}/>}/>
                    <Route path="/juegos/edit/:id" element={<JuegosForm api={apiJuegos}/>}/>
                    <Route path="/juegos/delete/:id" element={<JuegosForm del= {true} api={apiJuegos}/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
        )
}

export default App;

