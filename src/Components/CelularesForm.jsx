import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function CelularesForm( {api, del} ){
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [color, setColor] = useState("")
    const [precio, setPrecio] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [operadora, setOperadora] = useState("")
    const [validPrecio, setValidPrecio] = useState("")

    const {id} = useParams()

    const navigate = useNavigate()

 

    async function cargarCelulares(){
        try{
            let res = await axios(api+"/"+id)
            let data = await res.data 

            setMarca(data.marca)
            setModelo(data.modelo)
            setColor(data.color)
            setPrecio(data.precio)
            setDescripcion(data.descripcion)
            setOperadora(data.operadora)

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

    async function guardar(){
        try{
            let celulares = {
                marca: marca,
                modelo: modelo,
                color: color,
                precio: precio,
                descripcion: descripcion,
                operadora: operadora
            }
                let res = await axios.post(api, celulares)
                let data = await res.data    
                
                if (data.status === 1){
                    alert(data.message)
                    navigate("/celulares")
                   }
                   
        }
        catch(error){
            alert(error)
            console.log(error)
        }

    }

    async function editar(){
        try{

          let celulares = {
            celularId: id,
            marca: marca,
            modelo: modelo,
            color: color,
            precio: precio,
            descripcion: descripcion,
            operadora: operadora
          }  

          let res = await axios.put(api, celulares)
          let data = await res.data

          if (data.status === 1){
            alert(data.message)
            navigate("/celulares")
          }


        }
        catch(error){
            alert(error)
            console.log(error)
            if (error.response.status === 500){
                alert("El registro ya ha sido eliminado")
                navigate("/celulares") 
            }
            else{
                alert(error)
                console.log(error)
            }
        }

    }


    async function eliminar(){
        try{
            let res = await axios.delete(api+"?id="+id)
            let data = await res.data
            
            if(data.status === 1){
                alert(data.message)
                navigate("/celulares")
            }
        }
        catch(error){
            if(error.response.status === 404){
                alert("El registro ya ha sido eliminado")
                navigate("/celulares")
            }
            else{
                alert(error)
                console.log(error)
            }
           
        }
    }

    function enviar(event){
        event.preventDefault()
        event.stopPropagation()
        let form = document.querySelector(".needs-validation")

        if (!form.checkValidity()){
            form.classList.add('was-validated')
        }else{
            if (id === undefined)
                guardar()
            else if (del === undefined)
                editar()
            else{
                let respuesta = window.confirm("¿Está seguro que desea eliminar el registro?")
                if (respuesta === true)
                eliminar()
            }
                
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
                cargarCelulares()
            }
        }, [])

    return(
        <div>
             {
                id === undefined ?
                <div>
                <h1 className ="m-3 p-1 d-flex justify-content-center text-primary">Agregar Celular</h1>
                </div>
                :
                <div>
                <h1 className ="m-3 p-1 d-flex justify-content-center text-primary">Editar Celular</h1>
                </div>
            }
             
            <form className="needs-validation" noValidate>
                {

                    id !== undefined ?
                    <div className="form-group m-3 p-1">
                        <label className="">Celular Id</label>
                        <input className="form-control" type="text" value={id} readOnly disabled />
                    </div>
                    :
                        ""

                }
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Marca:</b></label>
                    <input type = "text" className="form-control" onChange={(e) => setMarca(e.target.value)} disabled={del===undefined ? false : true} value={marca} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Modelo:</b></label>
                    <input type = "text" className="form-control" onChange={(e) => setModelo(e.target.value)} disabled={del===undefined ? false : true} value={modelo} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Color:</b></label>
                    <input type = "text" className="form-control" onChange={(e) => setColor(e.target.value)} disabled={del===undefined ? false : true} value={color} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Precio:</b></label>
                    <input type = "text" className={`form-control ${validPrecio}`} onChange={(e) => setPrecio(e.target.value)} disabled={del===undefined ? false : true} value={precio} onKeyUp={validarPrecio} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Descripción:</b></label>
                    <input type = "text" className="form-control" onChange={(e) => setDescripcion(e.target.value)} disabled={del===undefined ? false : true} value={descripcion}  required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className="form-group m-3 p-1">
                    <label className="form-label"><b>Operadora:</b></label>
                    <input type = "text" className="form-control" onChange={(e) => setOperadora(e.target.value)} disabled={del===undefined ? false : true} value={operadora} required />
                    <div className="valid-feedback">OK</div>
                    <div className="invalid-feedback">Campo requerido</div>
                </div>
                <div className=" m-2 p-1">
                    <button className= {`btn btn-${(id === undefined ? "success m-2" : del === undefined ? "primary m-2"  : "danger m-2")}`} onClick={(event) => enviar(event)}>{id === undefined ? <i className="fa-solid fa-floppy-disk"></i> : del=== undefined ? <i className="fa-solid fa-pen-to-square"></i> : <i className="fa-solid fa-pen-to-square"></i>} {id === undefined ? "Guardar" : del=== undefined ? "Editar" : "Eliminar"}</button>
                    <button className="btn btn-warning" onClick={() => navigate("/celulares")}><i className="fa-solid fa-xmark"></i> Cancelar</button>
                </div>
            </form>            
        </div>
    )
}

export default CelularesForm;