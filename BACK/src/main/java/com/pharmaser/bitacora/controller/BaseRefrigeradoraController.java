package com.pharmaser.bitacora.controller;


import com.pharmaser.bitacora.model.BaseRefrigeradora;
import com.pharmaser.bitacora.model.Farmacias;
import com.pharmaser.bitacora.service.BaseRefrigeradoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/baseRefrigeradora")
public class BaseRefrigeradoraController {

    @Autowired
    private BaseRefrigeradoraService baseRefrigeradoraService;

    @GetMapping("")
    public List<BaseRefrigeradora>getAllBaseRefrigeradora(){
        return baseRefrigeradoraService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseRefrigeradora> getBaseRefrigeradoraById(@PathVariable Long id){
        BaseRefrigeradora baseRefrigeradora = baseRefrigeradoraService.findById(id);
        if (baseRefrigeradora != null) {
            return ResponseEntity.ok(baseRefrigeradora);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("")
    public BaseRefrigeradora createBaseRefrigeradora(@RequestBody BaseRefrigeradora baseRefrigeradora){
        return baseRefrigeradoraService.save(baseRefrigeradora);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseRefrigeradora> updateBaseRefrigeradora(@PathVariable Long id, @RequestBody BaseRefrigeradora baseRefrigeradoraDetails){
        BaseRefrigeradora updatedBaseRefrigeradora = baseRefrigeradoraService.findById(id);
        if (updatedBaseRefrigeradora != null) {
            updatedBaseRefrigeradora.setEstado(baseRefrigeradoraDetails.getEstado());
            updatedBaseRefrigeradora.setMarca(baseRefrigeradoraDetails.getMarca());
            updatedBaseRefrigeradora.setModelo(baseRefrigeradoraDetails.getModelo());
            updatedBaseRefrigeradora.setDescripcion(baseRefrigeradoraDetails.getDescripcion());
            updatedBaseRefrigeradora.setFuncionarios(baseRefrigeradoraDetails.getFuncionarios());
            updatedBaseRefrigeradora.setSerial(baseRefrigeradoraDetails.getSerial());
            updatedBaseRefrigeradora.setFechaCompra(baseRefrigeradoraDetails.getFechaCompra());
            return ResponseEntity.ok(baseRefrigeradoraService.save(updatedBaseRefrigeradora));
        }else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/softDelete/{id}")
    public ResponseEntity<Void> softDeleteBaseR(@PathVariable Long id) {
        BaseRefrigeradora baseRefrigeradora = baseRefrigeradoraService.findById(id);
        if (baseRefrigeradora != null) {
            baseRefrigeradoraService.softDelete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
