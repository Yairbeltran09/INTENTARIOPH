package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.Regente;
import com.pharmaser.bitacora.service.RegenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/regente")
public class RegenteController {

    @Autowired
    private RegenteService regenteService;


    @GetMapping("")
    public List<Regente> getAllRegentes() {
        return regenteService.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Regente> getRegenteById(@PathVariable Long id) {
        Regente regente = regenteService.findById(id);
        if (regente != null) {
            return ResponseEntity.ok(regente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("")
    public Regente createRegente(@RequestBody Regente regente) {
        return regenteService.save(regente);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Regente> updateRegente(
            @PathVariable Long id,
            @RequestBody Regente regenteDetails) {

        Regente regente = regenteService.findById(id);

        if (regente != null) {
            regente.setNombre(regenteDetails.getNombre());
            regente.setCorreo(regenteDetails.getCorreo());
            regente.setNumero(regenteDetails.getNumero());
            regente.setFarmacia(regenteDetails.getFarmacia());

            Regente updatedRegente = regenteService.save(regente);
            return ResponseEntity.ok(updatedRegente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegente(@PathVariable Long id) {
        if (regenteService.findById(id) != null) {
            regenteService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
