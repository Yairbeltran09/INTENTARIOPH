package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Monitores;
import com.pharmaser.bitacora.repository.MonitoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitresService {

    @Autowired
    private MonitoresRepository monitoresRepository;

    public List<Monitores>findAll(){
        return monitoresRepository.findAll();
    }
    public Monitores findById(Long id){
        return monitoresRepository.findById(id).orElse(null);
    }

    public Monitores save(Monitores monitores){
        return monitoresRepository.save(monitores);
    }
    public void delete(Long id){
        monitoresRepository.deleteById(id);
    }
}
