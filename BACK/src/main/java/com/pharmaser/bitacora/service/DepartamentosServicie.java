package com.pharmaser.bitacora.service;

import com.pharmaser.bitacora.model.*;
import com.pharmaser.bitacora.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import java.util.List;

@Service
public class DepartamentosServicie {

    @Autowired
    private DepartamentosRepository departamentosRepository;

    public List<Departamentos> findAll() {
        return departamentosRepository.findAll();
    }

    public Departamentos findById(Long id) {
        return departamentosRepository.findById(id).orElse(null);
    }

    public Departamentos save(Departamentos departamento) {
        return departamentosRepository.save(departamento);
    }

    public void delete(Long id) {
        departamentosRepository.deleteById(id);
    }
}
