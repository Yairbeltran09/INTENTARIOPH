package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Teclados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TecladosRepository extends JpaRepository<Teclados, Long> {
}
