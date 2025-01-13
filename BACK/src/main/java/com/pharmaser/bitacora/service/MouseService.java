package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Mouses;
import com.pharmaser.bitacora.repository.MouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MouseService {

    @Autowired
    private MouseRepository mouseRepository;

    public List<Mouses>findAll(){
        return mouseRepository.findAll();
    }
    public Mouses findById(Long id){
        return mouseRepository.findById(id).orElse(null);
    }

    public Mouses save(Mouses mouse){
        return mouseRepository.save(mouse);
    }
    public void delete(Long id){
        mouseRepository.deleteById(id);
    }
}
