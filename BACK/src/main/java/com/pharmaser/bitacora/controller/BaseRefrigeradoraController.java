package com.pharmaser.bitacora.controller;


import com.pharmaser.bitacora.model.BaseRefrigeradora;
import com.pharmaser.bitacora.service.BaseRefrigeradoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/baseRefrigeradora")
public class BaseRefrigeradoraController {

    @Autowired
    private BaseRefrigeradoraService baseRefrigeradoraService;

    @GetMapping("")
    public List<BaseRefrigeradora>getAllBaseRefrigeradoras(){
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
            updatedBaseRefrigeradora.setFecha_compra(baseRefrigeradoraDetails.getFecha_compra());
            return ResponseEntity.ok(baseRefrigeradoraService.save(updatedBaseRefrigeradora));
        }else {
            return ResponseEntity.notFound().build();
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteBaseRefrigeradora vc
    }

}
