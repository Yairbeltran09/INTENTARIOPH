package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.ProveedorInternet;
import com.pharmaser.bitacora.service.ProveedorInternetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/proveedorinternet")
public class ProveedorInternetController {

    @Autowired
    private ProveedorInternetService proveedorInternetService;

    @GetMapping("")
    public List<ProveedorInternet> getAllProveedorInternet() {
        return proveedorInternetService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProveedorInternet> getProveedorInternetById(@PathVariable Long id) {
        ProveedorInternet proveedorInternet = proveedorInternetService.findById(id);
        if (proveedorInternet != null) {
            return ResponseEntity.ok(proveedorInternet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ProveedorInternet createProveedorInternet(@RequestBody ProveedorInternet proveedorInternet) {
        return proveedorInternetService.save(proveedorInternet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProveedorInternet> updateProveedorInternet(
            @PathVariable Long id,
            @RequestBody ProveedorInternet proveedorInternetDetails) {

        ProveedorInternet proveedorInternet = proveedorInternetService.findById(id);

        if (proveedorInternet != null) {
            proveedorInternet.setNombre(proveedorInternetDetails.getNombre());
            proveedorInternet.setNombre_contacto(proveedorInternetDetails.getNombre_contacto());
            proveedorInternet.setNumero_contacto(proveedorInternetDetails.getNumero_contacto());
            proveedorInternet.setCorreo(proveedorInternetDetails.getCorreo());
            proveedorInternet.setEstado(proveedorInternetDetails.getEstado());
            proveedorInternet.setObservacion(proveedorInternetDetails.getObservacion());

            ProveedorInternet updatedProveedorInternet = proveedorInternetService.save(proveedorInternet);
            return ResponseEntity.ok(updatedProveedorInternet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/softDelete/{id}")
    public ResponseEntity<Void> softDeleteProveedorInternet(@PathVariable Long id) {
        ProveedorInternet proveedorInternet = proveedorInternetService.findById(id);
        if (proveedorInternet != null) {
            proveedorInternetService.softDelete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

