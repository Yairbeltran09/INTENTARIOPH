package com.pharmaser.bitacora.service;



import com.pharmaser.bitacora.model.Reporte;
import com.pharmaser.bitacora.repository.ReporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteService {

    @Autowired
    private ReporteRepository reporteRepo;

    public List<Reporte> findAll() {
        return reporteRepo.findAll();
    }

    public Reporte findById(Long id) {
        return reporteRepo.findById(id).orElse(null);
    }

    public Reporte save(Reporte reporte) {
        return reporteRepo.save(reporte);
    }

    public void delete(Long id) {
        reporteRepo.deleteById(id);
    }
}