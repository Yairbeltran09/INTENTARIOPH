package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.ProveedorEnvio;
import com.pharmaser.bitacora.service.ProveedorEnvioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedorenvio")  // Corregido el typo en la URL
public class ProveedorEnvioController {

    @Autowired
    private ProveedorEnvioService proveedorEnvioService;

    @GetMapping("")
    public List<ProveedorEnvio> getAllProveedorEnvio() {
        return proveedorEnvioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProveedorEnvio> getProveedorEnvioById(@PathVariable Long id) {
        ProveedorEnvio proveedorE = proveedorEnvioService.findById(id);  // Corregido el uso de la instancia
        if (proveedorE != null) {
            return ResponseEntity.ok(proveedorE);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ProveedorEnvio createProveedorE(@RequestBody ProveedorEnvio proveedorE) {
        return proveedorEnvioService.save(proveedorE);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProveedorEnvio> updateProveedorE(@PathVariable Long id, @RequestBody ProveedorEnvio proveedorEDetails) {
        ProveedorEnvio updatedProveedorEnvio = proveedorEnvioService.findById(id);
        if (updatedProveedorEnvio != null) {

            updatedProveedorEnvio.setNombreProveedor(proveedorEDetails.getNombreProveedor());
            updatedProveedorEnvio.setNumeroContacto(proveedorEDetails.getNumeroContacto());
            updatedProveedorEnvio.setCorreo(proveedorEDetails.getCorreo());
            updatedProveedorEnvio.setEstado(proveedorEDetails.getEstado());
            return ResponseEntity.ok(proveedorEnvioService.save(updatedProveedorEnvio));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProveedorE(@PathVariable Long id) {
        if (proveedorEnvioService.findById(id) != null) {
            proveedorEnvioService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
