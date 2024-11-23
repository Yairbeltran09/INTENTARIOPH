package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.Usuarios;
import com.pharmaser.bitacora.service.UsuariosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsuariosController {
    @Autowired
    private UsuariosService usuariosService;

    @PostMapping
    public Usuarios createUser(@RequestBody Usuarios usuarios) {

        return usuariosService.createUser(usuarios);
    }

    @GetMapping
    public List<Usuarios> getAllUsers() {

        return usuariosService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Usuarios getUser(@PathVariable Long id) {

        return usuariosService.getUserById(id);
    }

    @PutMapping("/{id}")
    public Usuarios updateUser(@PathVariable Long id, @RequestBody Usuarios usuarios) {

        return usuariosService.updateUser(id, usuarios);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {

        usuariosService.deleteUser(id);
    }
}
