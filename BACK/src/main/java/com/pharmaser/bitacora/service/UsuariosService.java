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

    public Usuarios getUserByUsername(String username) {
        return usuariosRepository.findByUsername(username).orElse(null);
    }

    public Usuarios updateUser(Long id, Usuarios usuarios) {
        Usuarios existingUser = usuariosRepository.findById(id).orElse(null);
        if (existingUser != null) {
            if (usuarios.getUsername() != null) {
                existingUser.setUsername(usuarios.getUsername());
            }
            if (usuarios.getPassword() != null) {
                existingUser.setPassword(usuarios.getPassword());
            }
            if (usuarios.getRole() != null) {
                existingUser.setRole(usuarios.getRole());
            }
            if (usuarios.getFarmacia() != null) {
                existingUser.setFarmacia(usuarios.getFarmacia());
            }
            if (usuarios.getStatus() != null) {
                existingUser.setStatus(usuarios.getStatus());
            }
            return usuariosRepository.save(existingUser);
        }
        return null;
    }

    public void deleteUser(Long id) {
        usuariosRepository.deleteById(id);
    }
}
