package com.example.packnmove.controller;

import com.example.packnmove.exceptions.InvalidCredentialsException;
import com.example.packnmove.model.CartDto;
import com.example.packnmove.model.UserDto;
import com.example.packnmove.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addPlanToCart")
    public CartDto addPlanToCart(@RequestParam Long userId, @RequestParam Long planId) throws InvalidCredentialsException {
        System.out.println("Got request for addPlanToCart");
        return userService.addPlanToCart(userId, planId);
    }

    @PostMapping("/removePlanFromCart")
    public CartDto removePlanFromCart(@RequestParam Long userId, @RequestParam Long planId) throws InvalidCredentialsException {
        return userService.removePlanFromCart(userId, planId);
    }

    @PostMapping("/getVerificationEmail")
    public ResponseEntity<Boolean> getVerificationEmail(@RequestBody UserDto userDto) throws InvalidCredentialsException {
        return ResponseEntity.ok(userService.sendVerificationEmail(userDto));
    }

    @PostMapping("/verifyEmail")
    public ResponseEntity<Boolean> verifyEmail(@RequestBody String verificationToken) throws InvalidCredentialsException {
        return ResponseEntity.ok(userService.verifyEmail(verificationToken));
    }

    @GetMapping("/getUser")
    public UserDto getUser() {
        return userService.getUser();
    }
}
