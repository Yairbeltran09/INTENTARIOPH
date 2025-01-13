package com.pharmaser.bitacora.service;


import com.pharmaser.bitacora.model.HubUsb;
import com.pharmaser.bitacora.repository.HubUsbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HubUsbServicie {

    @Autowired
    private HubUsbRepository hubUsbRepository;

    public List<HubUsb>findAll(){
        return hubUsbRepository.findAll();
    }
    public HubUsb findById(Long id){
        return hubUsbRepository.findById(id).orElse(null);
    }

    public HubUsb save(HubUsb hubUsb){
        return hubUsbRepository.save(hubUsb);
    }
    public void delete(Long id){
        hubUsbRepository.deleteById(id);
    }
}
