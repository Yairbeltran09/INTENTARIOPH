package com.pharmaser.bitacora.service;

import com.pharmaser.bitacora.model.CanalTransmision;
import com.pharmaser.bitacora.model.Ciudades;
import com.pharmaser.bitacora.repository.CanalTransmisionRepository;
import com.pharmaser.bitacora.repository.CiudadesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CanalTransmisionService {
    @Autowired
    private CanalTransmisionRepository canalTransmisionRepository;

    public List<CanalTransmision> findAll() {
        return canalTransmisionRepository.findAll();
    }

    public CanalTransmision findById(Long id){
        return canalTransmisionRepository.findById(id).orElse(null);
    }

    public CanalTransmision save(CanalTransmision canalTransmision){
        return canalTransmisionRepository.save(canalTransmision);

    }

    public void delete(Long id){
        canalTransmisionRepository.deleteById(id);
    }
}
