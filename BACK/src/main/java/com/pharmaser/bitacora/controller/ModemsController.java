package com.pharmaser.bitacora.controller;



import com.pharmaser.bitacora.model.Modems;
import com.pharmaser.bitacora.service.ModemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/modems")
public class ModemsController {

    @Autowired
    private ModemsService modemsService;

    @GetMapping("")
    public List<Modems> getAllModems() {
        return modemsService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Modems> getModemsById(@PathVariable Long id) {
        Modems modems = modemsService.findById(id);
        if (modems != null) {
            return ResponseEntity.ok(modems);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public Modems createModems(@RequestBody Modems modems) {
        return modemsService.save(modems);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Modems> updatedModems(@PathVariable Long id, @RequestBody Modems modemsDetails) {
        Modems updatedModems = modemsService.findById(id);
        if (updatedModems != null) {
            updatedModems.setEstado(modemsDetails.getEstado());
            updatedModems.setFarmacia(modemsDetails.getFarmacia());
            updatedModems.setEstado(modemsDetails.getEstado());
            return ResponseEntity.ok(modemsService.save(updatedModems));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModems(@PathVariable Long id) {
        if (modemsService.findById(id) != null) {
            modemsService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
