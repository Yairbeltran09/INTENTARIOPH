package com.pharmaser.bitacora.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.sql.Date;
import java.sql.Time;

@Entity
public class Reporte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private Integer ano;
    private Integer mes;
    private String radicado;

    @ManyToOne
    @JoinColumn(name = "id_farmacia")
    private Farmacias farmacia;

    @Column(nullable = true)
    private Date fecha;

    @Column(nullable = true)
    private Timestamp fecha_hora_inicio;

    @Column(nullable = true)
    private Timestamp fecha_hora_fin;

    @Column(nullable = true)
    private Time duracion_incidente;
    private String estado;
    private Boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "id_motivo")
    private MotivoReporte motivo;


    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        isDeleted = isDeleted;
    }

    private String observacion;

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public MotivoReporte getMotivo() {
        return motivo;
    }

    public void setMotivo(MotivoReporte motivo) {
        this.motivo = motivo;
    }

    public String getRadicado() {
        return radicado;
    }

    public void setRadicado(String radicado) {
        this.radicado = radicado;
    }

    public Integer getMes() {
        return mes;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Timestamp getFecha_hora_inicio() {
        return fecha_hora_inicio;
    }

    public void setFecha_hora_inicio(Timestamp fecha_hora_inicio) {
        this.fecha_hora_inicio = fecha_hora_inicio;
    }

    public Timestamp getFecha_hora_fin() {
        return fecha_hora_fin;
    }

    public void setFecha_hora_fin(Timestamp fecha_hora_fin) {
        this.fecha_hora_fin = fecha_hora_fin;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Farmacias getFarmacia() {
        return farmacia;
    }

    public void setFarmacia(Farmacias farmacia) {
        this.farmacia = farmacia;
    }

    public Time getDuracion_incidente() {
        return duracion_incidente;
    }

    public void setDuracion_incidente(Time duracion_incidente) {
        this.duracion_incidente = duracion_incidente;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}