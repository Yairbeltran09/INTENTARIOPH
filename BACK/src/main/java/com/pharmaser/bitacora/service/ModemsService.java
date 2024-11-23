package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.Modems;
import com.pharmaser.bitacora.repository.ModemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModemsService {

    @Autowired
    private ModemsRepository modemsRepo;

    public List<Modems> findAll() {
        return modemsRepo.findAll();
    }

    public Modems findById(Long id) {
        return modemsRepo.findById(id).orElse(null);
    }

    public Modems save(Modems modem) {
        return modemsRepo.save(modem);
    }

    public void delete(Long id) {
        modemsRepo.deleteById(id);
    }
}