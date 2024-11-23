package com.pharmaser.bitacora.model;

import jakarta.persistence.*;
import java.security.Timestamp;



@Entity
public class Traslado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne // Relación con Farmacias
    @JoinColumn(name = "id_farmacia")
    private Farmacias farmacia;

    private Timestamp fecha_traslado;
    private String motivo_traslado;



    @ManyToOne // Relación con Ciudades
    @JoinColumn(name = "id_ciudad")
    private Ciudades ciudad;


    @ManyToOne
    @JoinColumn(name = "id_proveedor")
    private ProveedorInternet proveedorInternet;

    public Ciudades getCiudad() {
        return ciudad;
    }

    public void setCiudad(Ciudades ciudad) {
        this.ciudad = ciudad;
    }

    public Farmacias getFarmacia() {
        return farmacia;
    }

    public void setFarmacia(Farmacias farmacia) {
        this.farmacia = farmacia;
    }

    public Timestamp getFecha_traslado() {
        return fecha_traslado;
    }

    public void setFecha_traslado(Timestamp fecha_traslado) {
        this.fecha_traslado = fecha_traslado;
    }

    public String getMotivo_traslado() {
        return motivo_traslado;
    }

    public void setMotivo_traslado(String motivo_traslado) {
        this.motivo_traslado = motivo_traslado;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ProveedorInternet getProveedor() {
        return proveedorInternet;
    }

    public void setProveedor(ProveedorInternet proveedorInternet) {
        this.proveedorInternet = proveedorInternet;
    }
}