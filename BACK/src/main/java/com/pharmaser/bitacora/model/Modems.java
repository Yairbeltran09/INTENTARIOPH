package com.pharmaser.bitacora.model;

import jakarta.persistence.*;
import java.security.Timestamp;

@Entity
public class Modems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String numero_serie;
    private String marca;
    private String modelo;
    private String estado;

    @ManyToOne
    @JoinColumn(name = "ubicacion_modems")
    private Farmacias farmacia;

    private Boolean isDeleted = false;

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Farmacias getFarmacia() {
        return farmacia;
    }

    public void setFarmacia(Farmacias farmacia) {
        this.farmacia = farmacia;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getNumero_serie() {
        return numero_serie;
    }

    public void setNumero_serie(String numero_serie) {
        this.numero_serie = numero_serie;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setISDeleted(Boolean deleted) {
        isDeleted = isDeleted;
    }
}