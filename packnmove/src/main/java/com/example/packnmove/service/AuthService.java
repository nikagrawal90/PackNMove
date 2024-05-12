package com.example.packnmove.service;

import com.example.packnmove.entity.CartEntity;
import com.example.packnmove.entity.UserEntity;
import com.example.packnmove.exceptions.InvalidCredentialsException;
import com.example.packnmove.model.Role;
import com.example.packnmove.model.UserDto;
import com.example.packnmove.model.auth.AuthenticationResponse;
import com.example.packnmove.model.auth.VerifyTokenResponse;
import com.example.packnmove.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserService userService;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(PasswordEncoder passwordEncoder, UserRepository userRepository, UserService userService, EmailService emailService, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.userService = userService;
        this.emailService = emailService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public UserDto addUser(UserDto newUser) {
        // Make Role.USER as hardcoded in production app
        Role role = Role.USER;

        UserEntity userEntity = UserEntity.builder()
                .username(newUser.getUsername())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .email(newUser.getEmail())
                .emailVerified(false)
                .role(role)
                .cart(CartEntity.builder().plans(new HashSet<>()).build()).build();
        userRepository.save(userEntity);

        UserDto userDto = userEntity.convertToDTO();
        String verificationToken = userService.generateAndSaveToken(userDto);
        emailService.sendMailVerificationToken(verificationToken, userDto);

        return userDto;
    }

    public AuthenticationResponse login(UserDto userDto) throws InvalidCredentialsException {
        UserEntity userEntity = userRepository.findByUsername(userDto.getUsername()).orElseThrow();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDto.getUsername(),
                        userDto.getPassword()
                )
        );

        if(passwordEncoder.matches(userDto.getPassword(), userEntity.getPassword())){
            String token = userService.refreshToken(userEntity);
            return AuthenticationResponse.builder().token(token).user(userEntity.convertToDTO()).build();
        }
        else{
            throw new InvalidCredentialsException("Invalid Credentials");
        }
    }

    public VerifyTokenResponse verifyToken(String token) {
        return VerifyTokenResponse.builder().valid(jwtService.isValid(token)).build();
    }
}
