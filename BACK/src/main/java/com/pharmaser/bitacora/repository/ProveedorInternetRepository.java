package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.ProveedorInternet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProveedorInternetRepository extends JpaRepository<ProveedorInternet, Long> {

    List<ProveedorInternet> findAllByIsDeletedFalse();
}
