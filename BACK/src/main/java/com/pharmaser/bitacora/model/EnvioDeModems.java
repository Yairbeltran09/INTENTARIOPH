package com.pharmaser.bitacora.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class EnvioDeModems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_farmacia")
    private Farmacias farmacia;

    @ManyToOne
    @JoinColumn(name = "id_modem_principal")
    private Modems modemPrincipal;

    @ManyToOne
    @JoinColumn(name = "id_modem_secundario")
    private Modems modemSecundario;

    private LocalDateTime fecha_envio;
    private BigDecimal costo_envio;
    private String estado_envio;

    // Getters y setters
    public Modems getModemPrincipal() {
        return modemPrincipal;
    }

    public void setModemPrincipal(Modems modemPrincipal) {
        this.modemPrincipal = modemPrincipal;
    }

    public Modems getModemSecundario() {
        return modemSecundario;
    }

    public void setModemSecundario(Modems modemSecundario) {
        this.modemSecundario = modemSecundario;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getFecha_envio() {
        return fecha_envio;
    }

    public void setFecha_envio(LocalDateTime fecha_envio) {
        this.fecha_envio = fecha_envio;
    }

    public BigDecimal getCosto_envio() {
        return costo_envio;
    }

    public void setCosto_envio(BigDecimal costo_envio) {
        this.costo_envio = costo_envio;
    }

    public String getEstado_envio() {
        return estado_envio;
    }

    public void setEstado_envio(String estado_envio) {
        this.estado_envio = estado_envio;
    }

    public Farmacias getFarmacia() {
        return farmacia;
    }

    public void setFarmacia(Farmacias farmacia) {
        this.farmacia = farmacia;
    }
}