package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Portatiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortatilesRepository extends JpaRepository<Portatiles, Long> {
}
