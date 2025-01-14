package com.pharmaser.bitacora.model;

import jakarta.persistence.*;
import java.util.List;


@Entity
public class Funcionarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombre;
    private String apellido;
    private String area;
    private String Correo;


    @ManyToOne
    @JoinColumn(name = "Farmcias")
    private Farmacias farmacias;

    @OneToOne
    @JoinColumn(name = "id_hubusb")
    private HubUsb hubUsb;

    @OneToOne
    @JoinColumn(name = "id_Portatiles")
    private Portatiles portatiles;

    @OneToOne
    @JoinColumn(name = "id_Teclado")
    private Teclados teclados;

    @OneToOne
    @JoinColumn(name = "id_Mouse")
    private Mouses mouses;

    @OneToOne
    @JoinColumn(name = "id_BaseRefrigeradora")
    private BaseRefrigeradora baseRefrigeradora;

    @OneToOne
    @JoinColumn(name = "id_Diademas")
    private Diademas diademas;

    @OneToOne
    @JoinColumn(name = "id_Monitores")
    private Monitores monitores;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCorreo() {
        return Correo;
    }

    public void setCorreo(String correo) {
        Correo = correo;
    }


    public Farmacias getFarmacias() {
        return farmacias;
    }

    public void setFarmacias(Farmacias farmacias) {
        this.farmacias = farmacias;
    }

    public HubUsb getHubUsb() {
        return hubUsb;
    }

    public void setHubUsb(HubUsb hubUsb) {
        this.hubUsb = hubUsb;
    }

    public Monitores getMonitores() {
        return monitores;
    }

    public void setMonitores(Monitores monitores) {
        this.monitores = monitores;
    }

    public Diademas getDiademas() {
        return diademas;
    }

    public void setDiademas(Diademas diademas) {
        this.diademas = diademas;
    }

    public BaseRefrigeradora getBaseRefrigeradora() {
        return baseRefrigeradora;
    }

    public void setBaseRefrigeradora(BaseRefrigeradora baseRefrigeradora) {
        this.baseRefrigeradora = baseRefrigeradora;
    }

    public Teclados getTeclados() {
        return teclados;
    }

    public void setTeclados(Teclados teclados) {
        this.teclados = teclados;
    }

    public Portatiles getPortatiles() {
        return portatiles;
    }

    public void setPortatiles(Portatiles portatiles) {
        this.portatiles = portatiles;
    }

    public Mouses getMouses() {
        return mouses;
    }

    public void setMouses(Mouses mouses) {
        this.mouses = mouses;
    }
}
