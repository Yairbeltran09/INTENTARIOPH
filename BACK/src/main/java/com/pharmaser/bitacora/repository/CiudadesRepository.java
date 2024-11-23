package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Ciudades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CiudadesRepository extends JpaRepository<Ciudades, Long> {
}