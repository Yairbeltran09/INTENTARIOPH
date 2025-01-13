package com.pharmaser.bitacora.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pharmaser.bitacora.model.HubUsb;

@Repository
public interface HubUsbRepository extends JpaRepository<HubUsb, Long> {
}
