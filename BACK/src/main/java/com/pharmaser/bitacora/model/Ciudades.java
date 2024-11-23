package com.pharmaser.bitacora.model;

import jakarta.persistence.*;

@Entity
public class Ciudades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombre_ciudad;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departamentos departamento;

    public Departamentos getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamentos departamento) {
        this.departamento = departamento;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre_ciudad() {
        return nombre_ciudad;
    }

    public void setNombre_ciudad(String nombre_ciudad) {
        this.nombre_ciudad = nombre_ciudad;
    }
}