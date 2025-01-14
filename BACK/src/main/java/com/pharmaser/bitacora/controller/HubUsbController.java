package com.pharmaser.bitacora.controller;



import com.pharmaser.bitacora.model.HubUsb;
import com.pharmaser.bitacora.service.HubUsbServicie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hubusb")
public class HubUsbController {

    @Autowired
    private HubUsbServicie hubUsbServicie;

    @GetMapping("")
    public List<HubUsb>getAllHubUsb(){
        return hubUsbServicie.findAll();
    }


    @PostMapping("/{id}")
    public ResponseEntity<HubUsb> getHubUsbById(@PathVariable Long id) {
        HubUsb hubUsb = hubUsbServicie.findById(id);
        if (hubUsb != null) {
            return ResponseEntity.ok(hubUsb);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("")
    public HubUsb createHubUsb(@RequestBody HubUsb hubUsb) {
        return hubUsbServicie.save(hubUsb);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HubUsb> updateHubUsb(@PathVariable Long id, @RequestBody HubUsb hubUsbDetails){
        HubUsb updateHubUsb = hubUsbServicie.findById(id);
        if (updateHubUsb != null){
          updateHubUsb.setDescripcion(hubUsbDetails.getDescripcion());
          updateHubUsb.setEstado(hubUsbDetails.getEstado());
          updateHubUsb.setFuncionarios(hubUsbDetails.getFuncionarios());
          updateHubUsb.setMarca(hubUsbDetails.getMarca());
          updateHubUsb.setModelo(hubUsbDetails.getModelo());
          updateHubUsb.setSerial(hubUsbDetails.getSerial());
          updateHubUsb.setFecha_compra(hubUsbDetails.getFecha_compra());
          return ResponseEntity.ok(hubUsbServicie.save(updateHubUsb));
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHubUsb(@PathVariable Long id){
        if (hubUsbServicie.findById(id) != null){
            hubUsbServicie.delete(id);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
