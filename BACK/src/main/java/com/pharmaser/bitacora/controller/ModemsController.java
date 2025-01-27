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
    public Modems createModem(@RequestBody Modems modem) {
        return modemsService.save(modem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modems> updateModem(@PathVariable Long id, @RequestBody Modems modemDetails) {
        Modems modem = modemsService.findById(id);
        if (modem != null) {
            modem.setMarca(modemDetails.getMarca());
            modem.setModelo(modemDetails.getModelo());
            modem.setNumero_serie(modemDetails.getNumero_serie());
            modem.setEstado(modemDetails.getEstado());
            modem.setProveedorInternet(modemDetails.getProveedorInternet());
            return ResponseEntity.ok(modemsService.save(modem));
        }
        return ResponseEntity.notFound().build();
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