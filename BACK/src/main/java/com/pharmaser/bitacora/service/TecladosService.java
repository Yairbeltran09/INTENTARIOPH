package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Teclados;
import com.pharmaser.bitacora.repository.TecladosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TecladosService {

    @Autowired
    private TecladosRepository tecladosRepository;

    public List<Teclados>findAll(){
        return tecladosRepository.findAll();
    }
    public Teclados findById(Long id){
        return tecladosRepository.findById(id).orElse(null);
    }

    public Teclados save(Teclados teclado){
        return tecladosRepository.save(teclado);
    }

    public void delete(Long id){
        tecladosRepository.deleteById(id);
    }

}
