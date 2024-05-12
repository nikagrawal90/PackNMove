package com.example.packnmove.service;

import com.example.packnmove.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}") private String sender;

    @Autowired
    public EmailService(final JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    public void sendMailVerificationToken(String verificationToken, UserDto userDto) {
        String email = userDto.getEmail();
//        sendEmail(email, "Click the link below to verify your email", verificationToken);
        System.out.println("verification token - " + verificationToken);
    }
}
