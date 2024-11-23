package com.pharmaser.bitacora.service;

import com.pharmaser.bitacora.model.*;
import com.pharmaser.bitacora.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import java.util.List;


@Service
public class CiudadesServicie {

    @Autowired
    private CiudadesRepository ciudadesRepository;

    public List<Ciudades> findAll() {
        return ciudadesRepository.findAll();
    }

    public Ciudades findById(Long id){
        return ciudadesRepository.findById(id).orElse(null);
    }

    public Ciudades save(Ciudades ciudades){
        return ciudadesRepository.save(ciudades);

    }

    public void delete(Long id){
        ciudadesRepository.deleteById(id);
    }
}
