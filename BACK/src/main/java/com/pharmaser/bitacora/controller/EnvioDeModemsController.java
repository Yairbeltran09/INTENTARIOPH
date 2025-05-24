package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.EnvioDeModems;
import com.pharmaser.bitacora.service.EnvioDeModemsService;
import com.pharmaser.bitacora.service.ModemsService;
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

    @Autowired
    private ModemsService modemsService;

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
    public ResponseEntity<EnvioDeModems> createEnvio(@RequestBody EnvioDeModems envio) {
        try {
            System.out.println("=== CREANDO NUEVO ENVÍO ===");
            System.out.println("Farmacia ID: " + (envio.getFarmacia() != null ? envio.getFarmacia().getId() : "null"));
            System.out.println("Modem Principal ID: " + (envio.getModemPrincipal() != null ? envio.getModemPrincipal().getId() : "null"));
            System.out.println("Modem Secundario ID: " + (envio.getModemSecundario() != null ? envio.getModemSecundario().getId() : "null"));
            System.out.println("Fecha envío: " + envio.getFecha_envio());
            System.out.println("Costo envío: " + envio.getCosto_envio());
            System.out.println("Estado envío: " + envio.getEstado_envio());

            // Validaciones
            if (envio.getFarmacia() == null || envio.getFarmacia().getId() == 0) {
                throw new RuntimeException("Farmacia es requerida");
            }
            if (envio.getModemPrincipal() == null || envio.getModemPrincipal().getId() == 0) {
                throw new RuntimeException("Módem principal es requerido");
            }

            // Crear el envío
            EnvioDeModems savedEnvio = envioService.save(envio);

            // Actualizar estado del módem principal a "EN USO"
            if (envio.getModemPrincipal() != null) {
                modemsService.updateEstado(envio.getModemPrincipal().getId(), "EN USO");
                System.out.println("Módem principal actualizado a EN USO: " + envio.getModemPrincipal().getId());
            }

            // Actualizar estado del módem secundario a "EN USO" si existe
            if (envio.getModemSecundario() != null) {
                modemsService.updateEstado(envio.getModemSecundario().getId(), "EN USO");
                System.out.println("Módem secundario actualizado a EN USO: " + envio.getModemSecundario().getId());
            }

            System.out.println("Envío creado exitosamente con ID: " + savedEnvio.getId());
            return ResponseEntity.ok(savedEnvio);

        } catch (Exception e) {
            System.err.println("Error al crear envío: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error al crear el envío: " + e.getMessage());
        }
    }

    @PutMapping(
            value = "/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<EnvioDeModems> updateEnvio(@PathVariable Long id, @RequestBody EnvioDeModems envioDetails) {
        try {
            System.out.println("=== ACTUALIZANDO ENVÍO ID: " + id + " ===");
            System.out.println("Datos recibidos: " + envioDetails.toString());

            EnvioDeModems envio = envioService.findById(id);
            if (envio != null) {
                // Actualizar campos
                if (envioDetails.getFecha_envio() != null) {
                    envio.setFecha_envio(envioDetails.getFecha_envio());
                }
                if (envioDetails.getCosto_envio() != null) {
                    envio.setCosto_envio(envioDetails.getCosto_envio());
                }
                if (envioDetails.getEstado_envio() != null) {
                    envio.setEstado_envio(envioDetails.getEstado_envio());
                }

                EnvioDeModems updatedEnvio = envioService.save(envio);
                System.out.println("Envío actualizado exitosamente");
                return ResponseEntity.ok(updatedEnvio);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error al actualizar envío: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error al actualizar el envío: " + e.getMessage());
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
