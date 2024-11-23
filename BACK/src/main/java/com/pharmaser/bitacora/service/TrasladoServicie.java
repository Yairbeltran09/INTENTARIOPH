package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Traslado;
import com.pharmaser.bitacora.repository.TrasladoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrasladoServicie {

    @Autowired
    private TrasladoRepository trasladoRepository;

    public List<Traslado> findAll() {
        return trasladoRepository.findAll();
    }

    public Traslado findById(Long id) {
        return trasladoRepository.findById(id).orElse(null);
    }

    public Traslado save(Traslado traslado) {
        return trasladoRepository.save(traslado);
    }

    public void delete(Long id) {
        trasladoRepository.deleteById(id);
    }
}