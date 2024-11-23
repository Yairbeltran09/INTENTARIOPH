package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Departamentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartamentosRepository extends JpaRepository<Departamentos, Long> {
}