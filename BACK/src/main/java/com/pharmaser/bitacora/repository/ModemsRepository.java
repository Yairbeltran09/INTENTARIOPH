package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Modems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModemsRepository extends JpaRepository<Modems, Long> {
}