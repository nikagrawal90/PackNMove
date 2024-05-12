package com.example.packnmove.service;

import com.example.packnmove.entity.CartEntity;
import com.example.packnmove.entity.PlanEntity;
import com.example.packnmove.entity.TokenEntity;
import com.example.packnmove.entity.UserEntity;
import com.example.packnmove.exceptions.InvalidCredentialsException;
import com.example.packnmove.model.CartDto;
import com.example.packnmove.model.Role;
import com.example.packnmove.model.UserDto;
import com.example.packnmove.repository.TokenRepository;
import com.example.packnmove.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final CartService cartService;
    private final PlansService plansService;
    private final EmailService emailService;
    private final JwtService jwtService;



    @Autowired
    public UserServiceImpl(UserRepository userRepository, TokenRepository tokenRepository, CartService cartService, PlansService plansService, JwtService jwtService, EmailService emailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.cartService = cartService;
        this.plansService = plansService;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    @Override
    public UserDto getUser() {
        UserEntity userEntity = getUserEntityFromSecurityContext();
        return userEntity.convertToDTO();
    }

    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }

    @Override
    public CartDto addPlanToCart(Long userId, Long planId) throws InvalidCredentialsException {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow();
        authorize(userEntity.getUsername());
        CartEntity cartEntity = userEntity.getCart();
        PlanEntity planEntity = plansService.getPlanById(planId);

        return cartService.addPlanToCart(cartEntity, planEntity);
    }

    @Override
    public CartDto removePlanFromCart(Long userId, Long planId) throws InvalidCredentialsException {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow();
        authorize(userEntity.getUsername());
        CartEntity cartEntity = userEntity.getCart();
        PlanEntity planEntity = plansService.getPlanById(planId);
        return cartService.removePlanFromCart(cartEntity, planEntity);
    }

    @Override
    // Do not use this method anywhere. It is used by JwtAuthenticationFilter to authenticate users before setting SecurityContextHolder
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow();
    }

    public String generateAndSaveToken(UserDto user) {
        String token = jwtService.generateToken(user);
        UserEntity userEntity = getUserByUsername(user.getUsername());
        TokenEntity tokenEntity = TokenEntity.builder().user(userEntity).token(token).build();
        tokenRepository.save(tokenEntity);
        return token;
    }

    @Override
    public Boolean verifyEmail(String verificationToken) throws InvalidCredentialsException {
        String username = jwtService.extractUsername(verificationToken);
        authorize(username);
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow();

        if(jwtService.isValid(verificationToken, userEntity)) {
            userEntity.setEmailVerified(true);
            userRepository.save(userEntity);
            System.out.println("Email Verified");
            return true;
        }
        return false;
    }

    @Override
    public Boolean sendVerificationEmail(UserDto userDto) throws InvalidCredentialsException {
        authorize(userDto.getUsername());
        try{
            UserEntity userEntity = userRepository.findByUsername(userDto.getUsername()).orElseThrow();
            String verificationToken = refreshToken(userEntity);
            emailService.sendMailVerificationToken(verificationToken, userDto);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }

    }
    private void authorize(String username) throws InvalidCredentialsException {
        UserEntity userEntity = getUserEntityFromSecurityContext();
        if(userEntity.getUsername().equals(username) || userEntity.getRole().equals(Role.ADMIN)){
            return;
        }
        throw new InvalidCredentialsException("User not allowed to perform action");
    }

    private UserEntity getUserEntityFromSecurityContext() {
        return (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public String refreshToken(UserEntity userEntity) {
        tokenRepository.removeTokenEntityByUser(userEntity);
        return generateAndSaveToken(userEntity.convertToDTO());
    }
}
