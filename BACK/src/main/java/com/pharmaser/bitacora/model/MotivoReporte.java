package com.pharmaser.bitacora.model;

import jakarta.persistence.*;

@Entity
public class MotivoReporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String motivo;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}