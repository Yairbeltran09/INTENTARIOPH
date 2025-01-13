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

    private List<Funcionarios> findAll() {
        return funcionariosRepo.findAll();
    }

    private Funcionarios findById(Long id) {
        return funcionariosRepo.findById(id).orElse(null);
    }

    private Funcionarios save(Funcionarios funcionario) {
        return funcionariosRepo.save(funcionario);
    }

    private void delete(Long id) {
        funcionariosRepo.deleteById(id);
    }
}
