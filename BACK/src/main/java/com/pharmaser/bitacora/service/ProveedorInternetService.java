package com.pharmaser.bitacora.service;



import com.pharmaser.bitacora.model.ProveedorInternet;
import com.pharmaser.bitacora.repository.ProveedorInternetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProveedorInternetService {

    @Autowired
    private ProveedorInternetRepository proveedorRepo;

    public List<ProveedorInternet> findAll() {
        return proveedorRepo.findAllByIsDeletedFalse();
    }

    public ProveedorInternet findById(Long id) {
        return proveedorRepo.findById(id).orElse(null);
    }

    public ProveedorInternet save(ProveedorInternet proveedorInternet) {
        if (proveedorInternet.getEstado() == null) {
            proveedorInternet.setEstado("ACTIVO");
        }
        return proveedorRepo.save(proveedorInternet);
    }

    public void softDelete(Long id) {
        ProveedorInternet proveedor = proveedorRepo.findById(id).orElse(null);
        if (proveedor != null) {
            proveedor.setIsDeleted(true);
            proveedorRepo.save(proveedor);
        }
    }
}