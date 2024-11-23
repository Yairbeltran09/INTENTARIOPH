package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.Reporte;
import com.pharmaser.bitacora.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reporte")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;


    @GetMapping("")
    public List<Reporte> getAllReportes() {
        return reporteService.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Reporte> getReporteById(@PathVariable Long id) {
        Reporte reporte = reporteService.findById(id);
        if (reporte != null) {
            return ResponseEntity.ok(reporte);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("")
    public Reporte createReporte(@RequestBody Reporte reporte) {
        return reporteService.save(reporte);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Reporte> updateReporte(
            @PathVariable Long id,
            @RequestBody Reporte reporteDetails) {

        Reporte reporte = reporteService.findById(id);

        if (reporte != null) {
            reporte.setFecha(reporteDetails.getFecha());
            reporte.setAno(reporteDetails.getAno());
            reporte.setMes(reporteDetails.getMes());
            reporte.setRadicado(reporteDetails.getRadicado());
            reporte.setFarmacia(reporteDetails.getFarmacia());
            reporte.setFecha_hora_inicio(reporteDetails.getFecha_hora_inicio());
            reporte.setFecha_hora_fin(reporteDetails.getFecha_hora_fin());
            reporte.setDuracion_incidente(reporteDetails.getDuracion_incidente());
            reporte.setMotivo(reporteDetails.getMotivo());
            reporte.setObservacion(reporteDetails.getObservacion());

            Reporte updatedReporte = reporteService.save(reporte);
            return ResponseEntity.ok(updatedReporte);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReporte(@PathVariable Long id) {
        if (reporteService.findById(id) != null) {
            reporteService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
