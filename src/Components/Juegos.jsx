import React, {useState, useEffect} from "react";
import Tabla from "./Tabla";
import axios from "axios";

function Juegos(api){
    const [juegos, setJuegos] = useState()

    useEffect(()=>{
        cargarJuegos()
    },[])

    async function cargarJuegos(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/juegos")
            let data = await res.data

           //console.log(data)
           setJuegos(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }


    return(
        <div>
            <h1 className ="m-3 p-2 d-flex justify-content-center text-primary" >Juegos</h1>
            {
                juegos === undefined ?
                <div>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                <h1 className="d-flex justify-content-center">Cargando...</h1>
                </div>
                :
                <Tabla controlador={"juegos"} list={juegos} cols={["Juegos Id", "Título", "Descripción", "Plataforma", "Precio", "Categoría"]} />
            }
                   
            </div>
    )
}

export default Juegos;