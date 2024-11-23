package com.pharmaser.bitacora.controller;


import com.pharmaser.bitacora.model.MotivoReporte;
import com.pharmaser.bitacora.service.MotivoReporteService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/motivos")
public class MotivoReporteController {

    @Autowired
    private MotivoReporteService motivoService;

    @GetMapping("")
    public List<MotivoReporte> getAllMotivos() {
        return motivoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MotivoReporte> getMotivoById(@PathVariable Long id) {
        MotivoReporte motivo = motivoService.findById(id);
        if (motivo != null) {
            return ResponseEntity.ok(motivo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public MotivoReporte createMotivo(@RequestBody MotivoReporte motivo) {
        return motivoService.save(motivo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MotivoReporte> updateMotivo(@PathVariable Long id, @RequestBody MotivoReporte motivoDetails) {
        MotivoReporte updatedMotivo = motivoService.findById(id);
        if (updatedMotivo != null) {
            updatedMotivo.setMotivo(motivoDetails.getMotivo());
            return ResponseEntity.ok(motivoService.save(updatedMotivo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMotivo(@PathVariable Long id) {
        if (motivoService.findById(id) != null) {
            motivoService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}