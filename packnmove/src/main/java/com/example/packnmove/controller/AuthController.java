package com.example.packnmove.controller;

import com.example.packnmove.exceptions.InvalidCredentialsException;
import com.example.packnmove.model.UserDto;
import com.example.packnmove.model.auth.AuthenticationResponse;
import com.example.packnmove.model.auth.VerifyTokenResponse;
import com.example.packnmove.service.AuthService;
import com.example.packnmove.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public UserDto register(@RequestBody final UserDto userDto) {
        return authService.addUser(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserDto userDto) throws InvalidCredentialsException {
        return ResponseEntity.ok(authService.login(userDto));
    }

    @PostMapping("/verifyToken")
    public ResponseEntity<VerifyTokenResponse> verifyToken(@RequestBody String token) {
        return ResponseEntity.ok(authService.verifyToken(token));
    }
}
