package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {
}