package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.MotivoReporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotivoReporteRepository extends JpaRepository<MotivoReporte, Long> {
}