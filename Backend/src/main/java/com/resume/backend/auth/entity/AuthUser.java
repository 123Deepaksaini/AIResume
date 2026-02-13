package com.resume.backend.auth.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auth_users", uniqueConstraints = {
        @UniqueConstraint(name = "uk_auth_users_email", columnNames = "email")
})
public class AuthUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "password_hash", length = 255)
    private String passwordHash;

    @Column(name = "provider", nullable = false, length = 30)
    private String provider;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "reset_code", length = 20)
    private String resetCode;

    @Column(name = "reset_code_expiry")
    private LocalDateTime resetCodeExpiry;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getResetCode() { return resetCode; }
    public void setResetCode(String resetCode) { this.resetCode = resetCode; }
    public LocalDateTime getResetCodeExpiry() { return resetCodeExpiry; }
    public void setResetCodeExpiry(LocalDateTime resetCodeExpiry) { this.resetCodeExpiry = resetCodeExpiry; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
