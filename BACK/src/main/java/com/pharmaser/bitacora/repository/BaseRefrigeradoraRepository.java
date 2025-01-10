package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.BaseRefrigeradora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseRefrigeradoraRepository extends JpaRepository<BaseRefrigeradora, Long>{
}
