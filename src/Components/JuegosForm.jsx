import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function JuegosForm({api, del}){
    
    const[titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [plataforma, setPlataforma] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")
    const [validPrecio, setValidPrecio] = useState("")

    const {id} = useParams()

    const navigate = useNavigate()

    async function cargarJuegos(){
        try{
            let res = await axios(api+"/"+id)
            let data = await res.data 

            setTitulo(data.titulo)
            setDescripcion(data.descripcion)
            setPlataforma(data.plataforma)
            setPrecio(data.precio)
            setCategoria(data.categoria)
            

        }
            
        catch(error){
            if (error.response.status === 404){
                alert("El registro no Existe")
                navigate("/celulares")
            }
            else{
            alert(error)
            console.log(error)
            }
        }
    }

   

    function enviar(e){
        const form = document.querySelector(".needs-validation")
        e.preventDefault()
        e.stopPropagation()
       
       
       if (!form.checkValidity()){
        form.classList.add("was-validated")
       }
       else if(validarPrecio() === true){
        
        
        if (id === undefined)
            guardar()
        
        else if(del !== true){
            editar()
        }
        else{
            
            let respuesta = window.confirm("Está seguro que desea eliminar el juego")
            if (respuesta === true){
            eliminar()
            
        }
        
       }        
    } 
}   

    async function eliminar(){
        try{
            let res = await axios.delete(`${api}?id=${id}`)
            let data = await res.data
            
            if(data.status === 1){
                alert(data.message)
                navigate("/juegos")
            }
        }
        catch(error){
            if(error.response.status === 404){
                alert("El juego ya fue eliminado")
                navigate("/juegos")
            }
            alert(error)
            console.log(error)
        }
    }

    async function editar(){
        try {
            let juegos = {
                juegoId: id,
                titulo: titulo,
                descripcion: descripcion,
                plataforma: plataforma,
                precio: precio,
                categoria : categoria
            }

            let res = await axios.put(api, juegos)
            let data = res.data
            
            if(data.status === 1){
                alert(data.message)
                navigate("/juegos")
            }
        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }


    async function guardar(){
        try{
            let juegos = {
                titulo: titulo,
                descripcion: descripcion,
                plataforma: plataforma,
                precio: precio,
                categoria: categoria
            }
            let res = await axios.post(api, juegos)
            let data = res.data

            if (data.status === 1){
                alert(data.message)
                navigate("/juegos")
            }

        }
        catch(error){
            alert(error)
            console.log(error)
        }
    }

    function validarPrecio(){
        let expresion = "^[0-9]+$"
        const expr = new RegExp(expresion) 

        let result = expr.test(precio) 
        
        if(!result)
            setValidPrecio("is-invalid")
        else
            setValidPrecio("")

            return result
        }    
    

        useEffect(() =>{
            if (id !== undefined){
                cargarJuegos()
            }
        }, []) 

    return(
        <div>
            {
                id === undefined ?
                <div>
                <h1 className ="m-3 p-1 d-flex justify-content-center text-primary">Agregar Juego</h1>
                </div>
                :
                del === undefined ?
                <div>
                <h1 className ="m-3 p-1 d-flex justify-content-center text-primary">Editar Juego</h1>
                </div>
                :
                <div>
                <h1 className ="m-3 p-1 d-flex justify-content-center text-primary">Eliminar Juego</h1>
                </div>
            }

          
             
            <form className="needs-validation" noValidate>
                {
                    id === undefined ?
                    ""
                    :
                <div className="form-group m-3 p-1">
                    <label>Juego ID</label>
                    <input className="form-control" value={id} disabled/>
                </div>
                }
                
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Título</b></label>
                    <input type="text" value={titulo} className="form-control" disabled = {del === undefined ? false : true} onChange={(e) => setTitulo(e.target.value)} required />
                    <div className="invalid-feedback">Campo Obligatorio</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Descripción</b></label>
                    <input type="text" value={descripcion} className="form-control" disabled = {del === undefined ? false : true} onChange={(e) => setDescripcion(e.target.value)} required />
                    <div className="invalid-feedback">Campo Obligatorio</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Plataforma</b></label>
                    <input type="text" value={plataforma} className="form-control" disabled = {del === undefined ? false : true} onChange={(e) => setPlataforma(e.target.value)} required />
                    <div className="invalid-feedback">Campo Obligatorio</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Precio</b></label>
                    <input className={`form-control ${validPrecio}`} type="text" value={precio}  onKeyUp={validarPrecio} disabled = {del === undefined ? false : true} onChange={(e) => setPrecio(e.target.value)} required />
                    <div className="invalid-feedback">Campo Obligatorio (solo números)</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Categoría</b></label>
                    <input type="text" value={categoria} className="form-control" disabled = {del === undefined ? false : true} onChange={(e) => setCategoria(e.target.value)} required />
                    <div className="invalid-feedback">Campo Obligatorio</div></div>
                <div className=" m-2 p-1">
                    <button className= {`btn btn-${(id === undefined ? "success m-2" : del === undefined ? "primary m-2"  : "danger m-2")}`} onClick={(e) => enviar(e)}>{id === undefined ? <i className="fa-solid fa-floppy-disk"></i> : del=== undefined ? <i className="fa-solid fa-pen-to-square"></i> : <i className="fa-solid fa-pen-to-square"></i>} {id === undefined ? "Guardar" : del=== undefined ? "Editar" : "Eliminar"}</button>
                    <button className="btn btn-warning" onClick={() => navigate("/juegos")}><i className="fa-solid fa-xmark"></i> Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default JuegosForm;
