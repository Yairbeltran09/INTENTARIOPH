package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.Modems;
import com.pharmaser.bitacora.service.ModemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/modems")
public class ModemsController {

    @Autowired
    private ModemsService modemsService;

    @GetMapping("")
    public List<Modems> getAllModems() {
        return modemsService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Modems> getModemById(@PathVariable Long id) {
        Modems modem = modemsService.findById(id);
        if (modem != null) {
            return ResponseEntity.ok(modem);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("")
    public ResponseEntity<Modems> createModem(@RequestBody Modems modem) {
        try {
            System.out.println("=== CREANDO NUEVO MODEM ===");
            System.out.println("Datos recibidos: " + modem.toString());

            // Validaciones básicas
            if (modem.getMarca() == null || modem.getMarca().trim().isEmpty()) {
                throw new RuntimeException("La marca es requerida");
            }
            if (modem.getModelo() == null || modem.getModelo().trim().isEmpty()) {
                throw new RuntimeException("El modelo es requerido");
            }
            if (modem.getNumero_serie() == null || modem.getNumero_serie().trim().isEmpty()) {
                throw new RuntimeException("El número de serie es requerido");
            }
            if (modem.getProveedorInternet() == null || modem.getProveedorInternet().getId() == 0) {
                throw new RuntimeException("El proveedor de internet es requerido");
            }

            // Establecer valores por defecto
            if (modem.getEstado() == null || modem.getEstado().trim().isEmpty()) {
                modem.setEstado("DISPONIBLE");
            }
            if (modem.getIsDeleted() == null) {
                modem.setIsDeleted(false);
            }

            Modems savedModem = modemsService.save(modem);
            System.out.println("Modem creado con ID: " + savedModem.getId());
            return ResponseEntity.ok(savedModem);

        } catch (Exception e) {
            System.err.println("Error al crear modem: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error al crear el modem: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modems> updateModem(@PathVariable Long id, @RequestBody Modems modemDetails) {
        try {
            System.out.println("=== ACTUALIZANDO MODEM ID: " + id + " ===");
            System.out.println("Datos recibidos: " + modemDetails.toString());

            Modems modem = modemsService.findById(id);
            if (modem != null) {
                // Actualizar campos
                if (modemDetails.getMarca() != null) {
                    modem.setMarca(modemDetails.getMarca());
                }
                if (modemDetails.getModelo() != null) {
                    modem.setModelo(modemDetails.getModelo());
                }
                if (modemDetails.getNumero_serie() != null) {
                    modem.setNumero_serie(modemDetails.getNumero_serie());
                }
                if (modemDetails.getEstado() != null) {
                    modem.setEstado(modemDetails.getEstado());
                }
                if (modemDetails.getNumero() != null) {
                    modem.setNumero(modemDetails.getNumero());
                }
                if (modemDetails.getProveedorInternet() != null) {
                    modem.setProveedorInternet(modemDetails.getProveedorInternet());
                }
                if (modemDetails.getFarmacia() != null) {
                    modem.setFarmacia(modemDetails.getFarmacia());
                }

                Modems updatedModem = modemsService.save(modem);
                System.out.println("Modem actualizado exitosamente");
                return ResponseEntity.ok(updatedModem);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("Error al actualizar modem: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error al actualizar el modem: " + e.getMessage());
        }
    }

    @PutMapping("/softDelete/{id}")
    public ResponseEntity<Void> softDeleteModem(@PathVariable Long id) {
        Modems modem = modemsService.findById(id);
        if (modem != null) {
            modemsService.softDelete(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Modems> updateModemStatus(@PathVariable Long id, @RequestBody Map<String, String> estado) {
        Modems modem = modemsService.findById(id);
        if (modem != null) {
            modem.setEstado(estado.get("estado"));
            return ResponseEntity.ok(modemsService.save(modem));
        }
        return ResponseEntity.notFound().build();
    }
}
