package com.pharmaser.bitacora.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity()
@Table(name = "Usuarios")
public class Usuarios {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private long id;

    private String username;

    private String password;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles roles;

    @Column(columnDefinition = "boolean default true")
    private Boolean status;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {

        this.username = username;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {

        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Roles getRole() {
        return roles;
    }

    public void setRole(Roles roles) {
        this.roles = roles;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
