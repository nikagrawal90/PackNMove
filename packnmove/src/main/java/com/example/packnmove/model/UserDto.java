package com.example.packnmove.model;

import com.example.packnmove.entity.CartEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long userId;
    private String username;
    private String email;
    private boolean isEmailVerified;
    private String password;
    private String role;
    private CartDto cart;
}
