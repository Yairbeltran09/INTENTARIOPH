package com.pharmaser.bitacora.controller;


import com.pharmaser.bitacora.model.Funcionarios;
import com.pharmaser.bitacora.service.FuncionariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionariosController {

    @Autowired
    private FuncionariosService funcionariosService;




    @GetMapping
    public List<Funcionarios> getAllFuncionarios() {
        return funcionariosService.findAll();
    }


    

}
