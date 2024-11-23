package com.pharmaser.bitacora.service;

import com.pharmaser.bitacora.model.Usuarios;
import com.pharmaser.bitacora.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosService {

    @Autowired
    private UsuariosRepository usuariosRepository;

    public Usuarios createUser(Usuarios usuarios) {
        return usuariosRepository.save(usuarios);
    }

    public List<Usuarios> getAllUsers() {
        return usuariosRepository.findAll();
    }

    public Usuarios getUserById(Long id) {
        return usuariosRepository.findById(id).orElse(null);
    }

    public Usuarios updateUser(Long id, Usuarios usuarios) {
        Usuarios existingUser = usuariosRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setUsername(usuarios.getUsername());
            existingUser.setPassword(usuarios.getPassword());
            return usuariosRepository.save(existingUser);
        }
        return null;
    }

    public void deleteUser(Long id) {
        usuariosRepository.deleteById(id);
    }
}
