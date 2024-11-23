package com.pharmaser.bitacora.service;

import com.pharmaser.bitacora.model.*;
import com.pharmaser.bitacora.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import java.util.List;

@Service
public class ProveedorEnvioService {

    @Autowired
    private ProveedorEnvioRepository proveedorEnvioRepository;

    public List<ProveedorEnvio> findAll() {
        return proveedorEnvioRepository.findAll();
    }

    public ProveedorEnvio findById(Long id) {
        return proveedorEnvioRepository.findById(id).orElse(null);
    }

    public ProveedorEnvio save(ProveedorEnvio proveedorE) {
        return proveedorEnvioRepository.save(proveedorE);
    }

    public void delete(Long id) {
        proveedorEnvioRepository.deleteById(id);
    }
}
