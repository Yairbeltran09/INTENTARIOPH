package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.EnvioDeModems;
import com.pharmaser.bitacora.service.EnvioDeModemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enviosmodems")
public class EnvioDeModemsController {

    @Autowired
    private EnvioDeModemsService envioService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<EnvioDeModems> getAllEnvios() {
        return envioService.findAll();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EnvioDeModems> getEnvioById(@PathVariable Long id) {
        EnvioDeModems envio = envioService.findById(id);
        if (envio != null) {
            return ResponseEntity.ok(envio);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public EnvioDeModems createEnvio(@RequestBody EnvioDeModems envio) {
        return envioService.save(envio);
    }

    @PutMapping(
            value = "/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<EnvioDeModems> updateEnvio(@PathVariable Long id, @RequestBody EnvioDeModems envioDetails) {
        EnvioDeModems updatedEnvio = envioService.findById(id);
        if (updatedEnvio != null) {
            updatedEnvio.setFecha_envio(envioDetails.getFecha_envio());
            updatedEnvio.setCosto_envio(envioDetails.getCosto_envio());
            updatedEnvio.setEstado_envio(envioDetails.getEstado_envio());
            return ResponseEntity.ok(envioService.save(updatedEnvio));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnvio(@PathVariable Long id) {
        if (envioService.findById(id) != null) {
            envioService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}