package com.pharmaser.bitacora.repository;

import com.pharmaser.bitacora.model.Mouses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MouseRepository extends JpaRepository<Mouses, Long> {
}
