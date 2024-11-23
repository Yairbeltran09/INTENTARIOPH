package com.pharmaser.bitacora.model;

import jakarta.persistence.*;

@Entity
public class Departamentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name_departamento;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName_departamento() {
        return name_departamento;
    }

    public void setName_departamento(String name_departamento) {
        this.name_departamento = name_departamento;
    }
}