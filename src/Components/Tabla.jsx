import React from "react";
import { Link } from "react-router-dom";

function Tabla({cols, list, controlador}){

console.log(cols)

return(
    <div>
      <table className="table table-stripped">
          <thead>
              <tr>
                <th>
                  <Link className="btn btn-success m-1 " to={`/${controlador}/add`}><i className="fa-solid fa-file"></i> Nuevo</Link>
                </th>
                    {
                      cols.map((value, index)=>{
                      return <th key={index}>{value}</th>
                      }
                        )
                    }
                </tr>
            </thead>
      <tbody>
          {
            list.map((item, index) =>{
            return <tr key={index}>
                <td>
                    <Link to={`/${controlador}/edit/${Object.values(item)[0]}`} className="btn btn-primary m-1"><i className="fa-solid fa-pen-to-square"></i> Editar</Link>
                    <Link to={`/${controlador}/delete/${Object.values(item)[0]}`} className="btn btn-danger"><i className="fa-solid fa-pen-to-square"></i> Borrar</Link>
                </td>
                    {
                      Object.values(item).map((value, index2) =>{
                      return <td key={index2}>{value}</td>
                      })
                    }
                    </tr>
                      })
                    }
                <tr>
                <td></td>
                    {
                      cols.map((value, index)=>{
                      return <th key={index}>{value}</th>
                      }
                        )
                    }
                </tr>
        </tbody>
            </table>
        </div>
    )
}

export default Tabla;