package com.resume.backend.auth.service;

import com.resume.backend.auth.entity.AuthUser;
import com.resume.backend.auth.repository.AuthUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final AuthEmailService authEmailService;

    @Value("${GOOGLE_CLIENT_ID:}")
    private String googleClientId;

    @Value("${app.auth.debug-reset-code:true}")
    private boolean debugResetCode;

    public AuthService(
            AuthUserRepository authUserRepository,
            PasswordEncoder passwordEncoder,
            RestTemplate restTemplate,
            ObjectMapper objectMapper,
            AuthEmailService authEmailService
    ) {
        this.authUserRepository = authUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.authEmailService = authEmailService;
    }

    public Map<String, Object> signup(String name, String email, String password) {
        String safeName = required(name, "Name is required");
        String safeEmail = normalizeEmail(email);
        String safePassword = required(password, "Password is required");

        if (safePassword.length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }

        if (authUserRepository.findByEmailIgnoreCase(safeEmail).isPresent()) {
            throw new IllegalArgumentException("Account already exists with this email");
        }

        AuthUser user = new AuthUser();
        user.setName(safeName);
        user.setEmail(safeEmail);
        user.setPasswordHash(passwordEncoder.encode(safePassword));
        user.setProvider("local");
        user.setAvatarUrl(avatarFromEmail(safeEmail));

        AuthUser saved = authUserRepository.save(user);
        return authResponse("Signup successful", saved);
    }

    public Map<String, Object> login(String email, String password) {
        String safeEmail = normalizeEmail(email);
        String safePassword = required(password, "Password is required");

        AuthUser user = authUserRepository.findByEmailIgnoreCase(safeEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!"local".equalsIgnoreCase(user.getProvider())) {
            throw new IllegalArgumentException("Please continue with Google for this account");
        }

        if (!passwordEncoder.matches(safePassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return authResponse("Login successful", user);
    }

    public Map<String, Object> forgotPassword(String email) {
        String safeEmail = normalizeEmail(email);

        AuthUser user = authUserRepository.findByEmailIgnoreCase(safeEmail)
                .orElseThrow(() -> new IllegalArgumentException("No account found with this email"));

        if (!"local".equalsIgnoreCase(user.getProvider())) {
            throw new IllegalArgumentException("Google accounts do not support password reset here");
        }

        String code = String.valueOf((int) (100000 + (Math.random() * 900000)));
        user.setResetCode(code);
        user.setResetCodeExpiry(LocalDateTime.now().plusMinutes(10));
        authUserRepository.save(user);

        try {
            authEmailService.sendResetCodeEmail(safeEmail, user.getName(), code);
        } catch (Exception mailError) {
            throw new IllegalArgumentException("Could not send reset email. Check SMTP configuration.");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Reset code sent to your email.");
        response.put("email", safeEmail);
        if (debugResetCode) {
            response.put("debugResetCode", code);
        }
        return response;
    }

    public Map<String, Object> resetPassword(String email, String code, String newPassword) {
        String safeEmail = normalizeEmail(email);
        String safeCode = required(code, "Reset code is required");
        String safePassword = required(newPassword, "New password is required");

        if (safePassword.length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }

        AuthUser user = authUserRepository.findByEmailIgnoreCase(safeEmail)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (!"local".equalsIgnoreCase(user.getProvider())) {
            throw new IllegalArgumentException("Google accounts do not support password reset here");
        }

        if (user.getResetCode() == null || !safeCode.equals(user.getResetCode())) {
            throw new IllegalArgumentException("Invalid reset code");
        }

        if (user.getResetCodeExpiry() == null || LocalDateTime.now().isAfter(user.getResetCodeExpiry())) {
            throw new IllegalArgumentException("Reset code expired. Request a new one.");
        }

        user.setPasswordHash(passwordEncoder.encode(safePassword));
        user.setResetCode(null);
        user.setResetCodeExpiry(null);
        authUserRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Password reset successful");
        return response;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> loginWithGoogle(String idToken) {
        String safeToken = required(idToken, "Google token is required");

        try {
            String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + safeToken;
            ResponseEntity<String> googleResponse = restTemplate.getForEntity(tokenInfoUrl, String.class);
            Map<String, Object> payload = objectMapper.readValue(googleResponse.getBody(), Map.class);

            String aud = stringVal(payload.get("aud"));
            String email = normalizeEmail(stringVal(payload.get("email")));
            String name = stringVal(payload.get("name"));
            String picture = stringVal(payload.get("picture"));
            String emailVerified = stringVal(payload.get("email_verified"));

            if (!"true".equalsIgnoreCase(emailVerified)) {
                throw new IllegalArgumentException("Google email is not verified");
            }

            if (!googleClientId.isBlank() && !googleClientId.equals(aud)) {
                throw new IllegalArgumentException("Google token audience mismatch");
            }

            Optional<AuthUser> existing = authUserRepository.findByEmailIgnoreCase(email);
            AuthUser user;
            if (existing.isPresent()) {
                user = existing.get();
                user.setProvider("google");
                if (!name.isBlank()) {
                    user.setName(name);
                }
                if (!picture.isBlank()) {
                    user.setAvatarUrl(picture);
                }
            } else {
                user = new AuthUser();
                user.setName(name.isBlank() ? "Google User" : name);
                user.setEmail(email);
                user.setProvider("google");
                user.setPasswordHash(null);
                user.setAvatarUrl(picture.isBlank() ? avatarFromEmail(email) : picture);
            }

            AuthUser saved = authUserRepository.save(user);
            return authResponse("Google login successful", saved);

        } catch (Exception e) {
            throw new IllegalArgumentException("Google login failed: " + e.getMessage());
        }
    }

    private Map<String, Object> authResponse(String message, AuthUser user) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("name", user.getName());
        userMap.put("email", user.getEmail());
        userMap.put("provider", user.getProvider());
        userMap.put("avatar", user.getAvatarUrl());

        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("user", userMap);
        response.put("accessToken", UUID.randomUUID().toString());
        return response;
    }

    private String normalizeEmail(String email) {
        return required(email, "Email is required").trim().toLowerCase();
    }

    private String required(String value, String message) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException(message);
        }
        return value.trim();
    }

    private String stringVal(Object value) {
        return value == null ? "" : String.valueOf(value).trim();
    }

    private String avatarFromEmail(String email) {
        return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email;
    }
}
