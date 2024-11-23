package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Farmacias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmaciasRepository extends JpaRepository<Farmacias, Long> {

    List<Farmacias> findAllByIsDeletedFalse();

}