package com.resume.backend.auth.service;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class AuthEmailService {

    private final JavaMailSender mailSender;

    @Value("${app.auth.mail-from:noreply@airesumebuilder.com}")
    private String fromEmail;

    public AuthEmailService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSender = mailSenderProvider.getIfAvailable();
    }

    public void sendResetCodeEmail(String toEmail, String name, String resetCode) {
        if (mailSender == null) {
            throw new IllegalStateException("Mail service is not configured. Set spring.mail.* properties.");
        }

        String displayName = (name == null || name.trim().isEmpty()) ? "User" : name.trim();
        String subject = "Your AI Resume password reset code";
        String body = "Hello " + displayName + ",\n\n"
                + "We received a request to reset your password.\n"
                + "Your reset code is: " + resetCode + "\n\n"
                + "This code expires in 10 minutes.\n"
                + "Use this code in the Reset Password screen.\n\n"
                + "If you did not request this, please ignore this email.\n\n"
                + "- AI Resume Builder";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
