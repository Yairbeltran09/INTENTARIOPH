package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.EnvioDeModems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnvioDeModemsRepository extends JpaRepository<EnvioDeModems, Long> {
}