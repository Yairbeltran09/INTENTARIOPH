package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Regente;
import com.pharmaser.bitacora.repository.RegenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegenteService {

    @Autowired
    private RegenteRepository regenteRepo;

    public List<Regente> findAll() {
        return regenteRepo.findAll();
    }

    public Regente findById(Long id) {
        return regenteRepo.findById(id).orElse(null);
    }

    public Regente save(Regente regente) {
        return regenteRepo.save(regente);
    }

    public void delete(Long id) {
        regenteRepo.deleteById(id);
    }
}