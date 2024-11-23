package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.*;
import com.pharmaser.bitacora.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import java.util.List;

@Service
public class MotivoReporteService {

    @Autowired
    private MotivoReporteRepository motivoReporteRepository;

    public List<MotivoReporte> findAll() {
        return motivoReporteRepository.findAll();
    }

    public MotivoReporte findById(Long id) {
        return motivoReporteRepository.findById(id).orElse(null);
    }

    public MotivoReporte save(MotivoReporte motivo) {
        return motivoReporteRepository.save(motivo);
    }

    public void delete(Long id) {
        motivoReporteRepository.deleteById(id);
    }
}