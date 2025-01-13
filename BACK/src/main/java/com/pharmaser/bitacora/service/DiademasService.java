package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Diademas;
import com.pharmaser.bitacora.repository.DiademasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiademasService {

    @Autowired
    private DiademasRepository diademasRepository;

    public List<Diademas>findAll(){
        return diademasRepository.findAll();
    }

    public Diademas findById(Long id){
        return diademasRepository.findById(id).orElse(null);
    }

    public Diademas save(Diademas diademas){
        return diademasRepository.save(diademas);
    }

    public void delete(Long id){
        diademasRepository.deleteById(id);
    }

}
