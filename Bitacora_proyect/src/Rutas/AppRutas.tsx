import { Route, Routes, Navigate } from "react-router-dom"
import Login from "../components/Login/Login"
import { Reportes } from "../Paginas/Reportes"
import { Proveedores } from "../Paginas/Proveedores"
import { Farmacias } from "../Paginas/Farmacias"
import { CrearProveedor } from "../Paginas/CrearProveedor"
import { EditarProveedor } from "../Paginas/EditarProveedor"
import { CrearFarmacia } from "../Paginas/CrearFarmacia"
import { EditarFarmacia } from "../Paginas/EditarFarmacias"
import { CrearReporte } from "../Paginas/CrearReportes"
import { EditarReporte } from "../Paginas/EditarReporte"
import { Modems } from "../Paginas/Modems"
import { EnviosModems } from "../Paginas/EnvioModems"
import ProtectedRoute from "../Rutas/ProtectedRoute"


export const AppRutas = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* Rutas accesibles para técnicos y admins */}
            <Route path="/reportes" element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                    <Reportes />
                </ProtectedRoute>
            } />
            <Route path="/crearReporte" element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                    <CrearReporte />
                </ProtectedRoute>
            } />
            <Route path="/editarReporte/:id" element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                    <EditarReporte />
                </ProtectedRoute>
            } />

            {/* Rutas solo para admin */}
            <Route path="/farmacias" element={
                <ProtectedRoute allowedRoles={[1]}>
                    <Farmacias />
                </ProtectedRoute>
            } />
            <Route path="/proveedores" element={
                <ProtectedRoute allowedRoles={[1]}>
                    <Proveedores />
                </ProtectedRoute>
            } />
            <Route path="/crearProveedor" element={
                <ProtectedRoute allowedRoles={[1]}>
                    <CrearProveedor />
                </ProtectedRoute>
            } />
            <Route path="/editarProveedor/:id" element={
                <ProtectedRoute allowedRoles={[1]}>
                    <EditarProveedor />
                </ProtectedRoute>
            } />
            <Route path="/crearFarmacia" element={
                <ProtectedRoute allowedRoles={[1]}>
                    <CrearFarmacia />
                </ProtectedRoute>
            } />
            <Route path="/editarFarmacia/:id" element={
                <ProtectedRoute allowedRoles={[1]}>
                    <EditarFarmacia />
                </ProtectedRoute>
            } />
            <Route path="/modems" element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                    <Modems />
                </ProtectedRoute>
            } />
            <Route path="/EnvioModems" element={
                <ProtectedRoute allowedRoles={[1, 2]}>
                    <EnviosModems />
                </ProtectedRoute>
            } />

            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    )
}