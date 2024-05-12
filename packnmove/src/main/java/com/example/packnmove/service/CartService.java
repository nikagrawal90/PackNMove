package com.example.packnmove.service;


import com.example.packnmove.entity.CartEntity;
import com.example.packnmove.entity.PlanEntity;
import com.example.packnmove.model.CartDto;
import com.example.packnmove.model.PlanDto;

public interface CartService {
    CartDto addPlanToCart(CartEntity cart, PlanEntity plan);
    CartDto removePlanFromCart(CartEntity cart, PlanEntity planEntity);
}
