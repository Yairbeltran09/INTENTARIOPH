package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Regente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegenteRepository extends JpaRepository<Regente, Long> {
}