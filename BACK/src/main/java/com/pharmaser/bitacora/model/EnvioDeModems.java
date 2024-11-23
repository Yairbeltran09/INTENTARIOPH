package com.pharmaser.bitacora.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.security.Timestamp;

@Entity
public class EnvioDeModems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_farmacia")
    private Farmacias farmacia;

    @ManyToOne
    @JoinColumn(name = "id_modem")
    private Modems modem;

    private Timestamp fecha_envio;

    @ManyToOne
    @JoinColumn(name = "id_proveedor_envio")
    private ProveedorEnvio proveedorEnvio;

    private BigDecimal costo_envio;
    private String estado_envio;








    public BigDecimal getCosto_envio() {
        return costo_envio;
    }

    public void setCosto_envio(BigDecimal costo_envio) {
        this.costo_envio = costo_envio;
    }

    public ProveedorEnvio getProveedorEnvio() {
        return proveedorEnvio;
    }

    public void setProveedorEnvio(ProveedorEnvio proveedorEnvio) {
        this.proveedorEnvio = proveedorEnvio;
    }

    public Modems getModem() {
        return modem;
    }

    public void setModem(Modems modem) {
        this.modem = modem;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Timestamp getFecha_envio() {
        return fecha_envio;
    }

    public void setFecha_envio(Timestamp fecha_envio) {
        this.fecha_envio = fecha_envio;
    }

    public Farmacias getFarmacia() {
        return farmacia;
    }

    public void setFarmacia(Farmacias farmacia) {
        this.farmacia = farmacia;
    }

    public String getEstado_envio() {
        return estado_envio;
    }

    public void setEstado_envio(String estado_envio) {
        this.estado_envio = estado_envio;
    }
}