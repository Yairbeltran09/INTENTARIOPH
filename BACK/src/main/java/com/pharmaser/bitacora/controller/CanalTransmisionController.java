package com.pharmaser.bitacora.controller;


import com.pharmaser.bitacora.model.CanalTransmision;
import com.pharmaser.bitacora.service.CanalTransmisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/canaltransmision")
public class CanalTransmisionController {

    @Autowired
    private CanalTransmisionService canalTransmisionService;

    @GetMapping("")
    public List<CanalTransmision> getAllCanalTransmision() {
        return canalTransmisionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CanalTransmision> getCanalTransmisionById(@PathVariable Long id) {
        CanalTransmision canalTransmision = canalTransmisionService.findById(id);
        if (canalTransmision != null) {
            return ResponseEntity.ok(canalTransmision);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public CanalTransmision createCanalTransmision(@RequestBody CanalTransmision canalTransmision) {
        return canalTransmisionService.save(canalTransmision);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CanalTransmision> updatedCanalTransmision(@PathVariable Long id, @RequestBody CanalTransmision canalTransmisionDetails) {
        CanalTransmision updatedCanalTransmision = canalTransmisionService.findById(id);
        if (updatedCanalTransmision != null) {
            updatedCanalTransmision.setNombre(canalTransmisionDetails.getNombre());
            return ResponseEntity.ok(canalTransmisionService.save(updatedCanalTransmision));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCanalTransmision(@PathVariable Long id) {
        if (canalTransmisionService.findById(id) != null) {
            canalTransmisionService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
