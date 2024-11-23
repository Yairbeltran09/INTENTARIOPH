package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Traslado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrasladoRepository extends JpaRepository<Traslado, Long> {
}