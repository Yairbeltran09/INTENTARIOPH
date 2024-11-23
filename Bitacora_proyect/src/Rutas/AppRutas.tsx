import { Route, Routes, Navigate } from "react-router-dom"
import Login from "../Paginas/Login"
import { Reportes } from "../Paginas/Reportes"
import { Farmacias } from "../Paginas/Farmacias"
import { Proveedores } from "../Paginas/Proveedores"
import { CrearProveedor } from "../Paginas/CrearProveedor"
import { EditarProveedor } from "../Paginas/EditarProveedor"
import { CrearFarmacia } from "../Paginas/CrearFarmacia"
import { EditarFarmacia } from "../Paginas/EditarFarmacias"
import { CrearReporte } from "../Paginas/CrearReportes"
import { EditarReporte } from "../Paginas/EditarReporte"

export const AppRutas = () => {
    return(
        <Routes>
            <Route path = '/login' element={<Login/>}/>
            <Route path = '/Reportes' element={<Reportes/>}/>
            <Route path="/Farmacias" element={<Farmacias/>}/>
            <Route path="/Proveedores" element={<Proveedores/>}/>
            <Route path="/CrearProveedor" element={<CrearProveedor/>}/>
            <Route path="/EditarProveedor/:id" element={<EditarProveedor/>}/>
            <Route path="/CrearFarmacia" element={<CrearFarmacia/>}/>
            <Route path="/EditarFarmacia/:id" element={<EditarFarmacia/>}/>
            <Route path="/CrearReporte" element={<CrearReporte/>}/>
            <Route path="/EditarReporte/:id" element={<EditarReporte/>}/>
            <Route path="/*" element ={ <Navigate to="/login" /> } />
        </Routes>
    )
}