package com.pharmaser.bitacora.service;



import com.pharmaser.bitacora.model.Farmacias;
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
        return modemsRepo.findAllByIsDeletedFalse();
    }

    public Modems findById(Long id) {
        return modemsRepo.findById(id).orElse(null);
    }

    public Modems save(Modems modem) {
        return modemsRepo.save(modem);
    }

    public void softDelete(Long id) {
        Modems modems = modemsRepo.findById(id).orElse(null);
        if (modems != null) {
            modems.setISDeleted(true);
            modemsRepo.save(modems);
        }
    }
}