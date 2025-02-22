package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Farmacias;
import com.pharmaser.bitacora.repository.FarmaciasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmaciasService {

    @Autowired
    private FarmaciasRepository farmaciasRepo;

    public List<Farmacias> findAll() {
        return farmaciasRepo.findAllByIsDeletedFalse();
    }

    public Farmacias findById(Long id) {
        return farmaciasRepo.findById(id).orElse(null);
    }

    public Farmacias save(Farmacias farmacia) {
        return farmaciasRepo.save(farmacia);
    }

    public void softDelete(Long id) {
        Farmacias farmacias = farmaciasRepo.findById(id).orElse(null);
        if (farmacias != null) {
            farmacias.setIsDeleted(true);
            farmaciasRepo.save(farmacias);
        }
    }
}