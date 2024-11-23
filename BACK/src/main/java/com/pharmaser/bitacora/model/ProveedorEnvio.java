package com.pharmaser.bitacora.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class ProveedorEnvio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String NombreProveedor;
    private String NumeroContacto;
    private String Correo;
    private String Estado;


    public String getCorreo() {
        return Correo;
    }

    public void setCorreo(String correo) {
        Correo = correo;
    }

    public String getEstado() {
        return Estado;
    }

    public void setEstado(String estado) {
        Estado = estado;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombreProveedor() {
        return NombreProveedor;
    }

    public void setNombreProveedor(String nombreProveedor) {
        NombreProveedor = nombreProveedor;
    }

    public String getNumeroContacto() {
        return NumeroContacto;
    }

    public void setNumeroContacto(String numeroContacto) {
        NumeroContacto = numeroContacto;
    }

}