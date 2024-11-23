package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.CanalTransmision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanalTransmisionRepository  extends JpaRepository<CanalTransmision, Long> {
}
