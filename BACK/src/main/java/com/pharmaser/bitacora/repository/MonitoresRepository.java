package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Monitores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MonitoresRepository extends JpaRepository<Monitores, Long> {
}
