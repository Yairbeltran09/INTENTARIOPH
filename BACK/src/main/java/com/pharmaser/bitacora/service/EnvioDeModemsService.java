package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.EnvioDeModems;
import com.pharmaser.bitacora.repository.EnvioDeModemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import java.util.List;

@Service
public class EnvioDeModemsService {

    @Autowired
    private EnvioDeModemsRepository envioDeModemsRepo;

    public List<EnvioDeModems> findAll() {
        return envioDeModemsRepo.findAll();
    }

    public EnvioDeModems findById(Long id) {
        return envioDeModemsRepo.findById(id).orElse(null);
    }

    public EnvioDeModems save(EnvioDeModems envio) {
        return envioDeModemsRepo.save(envio);
    }

    public void delete(Long id) {
        envioDeModemsRepo.deleteById(id);
    }
}