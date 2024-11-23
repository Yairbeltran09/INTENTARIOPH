package com.pharmaser.bitacora.model;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class ProveedorInternet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombre;
    private String nombre_contacto;
    private Integer numero_contacto;
    private Integer nit;
    private String correo;
    private String estado;
    private Date Fecha_contratacion;
    private String Observacion;
    private Boolean isDeleted = false;  // Columna isDeleted

    // Getters y Setters
    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }


    public String getObservacion() {
        return Observacion;
    }

    public void setObservacion(String observacion) {
        Observacion = observacion;
    }

    public Date getFecha_contratacion() {
        return Fecha_contratacion;
    }

    public void setFecha_contratacion(Date fecha_contratacion) {
        Fecha_contratacion = fecha_contratacion;
    }

    public Integer getNumero_contacto() {
        return numero_contacto;
    }

    public void setNumero_contacto(Integer numero_contacto) {
        this.numero_contacto = numero_contacto;
    }

    public Integer getNit() {
        return nit;
    }

    public void setNit(Integer nit) {
        this.nit = nit;
    }

    public String getNombre_contacto() {
        return nombre_contacto;
    }

    public void setNombre_contacto(String nombre_contacto) {
        this.nombre_contacto = nombre_contacto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
}