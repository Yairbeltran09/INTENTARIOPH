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
            modems.setIsDeleted(true);
            modemsRepo.save(modems);
        }
    }

    // Método para actualizar solo el estado
    public Modems updateEstado(Long id, String nuevoEstado) {
        Modems modem = modemsRepo.findById(id).orElse(null);
        if (modem != null) {
            modem.setEstado(nuevoEstado);
            return modemsRepo.save(modem);
        }
        return null;
    }

    // Método para obtener modems disponibles
    public List<Modems> findAvailableModems() {
        return modemsRepo.findAllByIsDeletedFalse()
                .stream()
                .filter(modem -> "DISPONIBLE".equals(modem.getEstado()))
                .toList();
    }
}
