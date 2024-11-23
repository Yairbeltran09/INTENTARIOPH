package com.pharmaser.bitacora.controller;

import com.pharmaser.bitacora.model.Roles;
import com.pharmaser.bitacora.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolesController {

    @Autowired
    private RolesService rolesService;

    @GetMapping("")
    public List<Roles> getAllRoles() {
        return rolesService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roles> getRoleById(@PathVariable Long id) {
        Roles roles = rolesService.findById(id);
        if (roles != null) {
            return ResponseEntity.ok(roles);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public Roles createRole(@RequestBody Roles roles) {
        return rolesService.save(roles);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Roles> updateRole(@PathVariable Long id, @RequestBody Roles rolesDetails) {
        Roles updatedRoles = rolesService.findById(id);
        if (updatedRoles != null) {
            updatedRoles.setName(rolesDetails.getName());
            return ResponseEntity.ok(rolesService.save(updatedRoles));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        if (rolesService.findById(id) != null) {
            rolesService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}