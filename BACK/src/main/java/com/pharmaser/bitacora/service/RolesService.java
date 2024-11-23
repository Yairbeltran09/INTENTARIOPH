package com.pharmaser.bitacora.service;

import com.pharmaser.bitacora.model.Roles;
import com.pharmaser.bitacora.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {

    @Autowired
    private RolesRepository rolesRepository;

    public List<Roles> findAll() {
        return rolesRepository.findAll();
    }

    public Roles findById(Long id) {
        return rolesRepository.findById(id).orElse(null);
    }

    public Roles save(Roles roles) {
        return rolesRepository.save(roles);
    }

    public void delete(Long id) {
        rolesRepository.deleteById(id);
    }


}