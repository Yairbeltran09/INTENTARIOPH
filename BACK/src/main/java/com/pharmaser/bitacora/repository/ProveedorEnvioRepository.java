package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.ProveedorEnvio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorEnvioRepository extends JpaRepository<ProveedorEnvio, Long> {
}