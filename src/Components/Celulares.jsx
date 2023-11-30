import React, {useState, useEffect} from "react";
import Tabla from "./Tabla";
import axios from "axios";



function Celulares({api}){

    const[celulares, setCelulares] = useState()
    

    useEffect(()=>{
        cargarCelulares()
    },[])

    async function cargarCelulares(){
        try{
            let res = await axios("https://denny2023.azurewebsites.net/api/celulares")
            let data = await res.data

           //console.log(data)
           setCelulares(data)
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

   
    return(
        <div>
            <h1 className ="m-3 p-2 d-flex justify-content-center text-primary" >Celulares</h1>
            {
                celulares === undefined ?
                <div>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                    </div>
                <h1 className="d-flex justify-content-center">Cargando...</h1>
                </div>
                :
                    <Tabla controlador={"celulares"} list={celulares} cols={["Celular Id", "Marca", "Modelo", "Color", "Precio", "Descripción", "Operadora"]} />
                    
            }
                   
            </div>
        
    )
}

export default Celulares;