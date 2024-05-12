package com.example.packnmove.service;

import com.example.packnmove.entity.UserEntity;
import com.example.packnmove.exceptions.InvalidCredentialsException;
import com.example.packnmove.model.CartDto;
import com.example.packnmove.model.UserDto;

public interface UserService {
    UserDto getUser();
    CartDto addPlanToCart(Long userId, Long planId) throws InvalidCredentialsException;
    CartDto removePlanFromCart(Long userId, Long planId) throws InvalidCredentialsException;
    String generateAndSaveToken(UserDto user);

    Boolean verifyEmail(String verificationToken) throws InvalidCredentialsException;

    Boolean sendVerificationEmail(UserDto userDto) throws InvalidCredentialsException;

    String refreshToken(UserEntity userEntity);
}
