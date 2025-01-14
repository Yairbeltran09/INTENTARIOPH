package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Funcionarios;
import com.pharmaser.bitacora.repository.FuncionariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionariosService {

    @Autowired
    private FuncionariosRepository funcionariosRepo;

    public List<Funcionarios> findAll() {
        return funcionariosRepo.findAll();
    }

    public Funcionarios findById(Long id) {
        return funcionariosRepo.findById(id).orElse(null);
    }

    public Funcionarios save(Funcionarios funcionario) {
        return funcionariosRepo.save(funcionario);
    }

    public void delete(Long id) {
        funcionariosRepo.deleteById(id);
    }
}
