package com.example.packnmove.service;

import com.example.packnmove.entity.CartEntity;
import com.example.packnmove.entity.PlanEntity;
import com.example.packnmove.model.CartDto;
import com.example.packnmove.repository.CartRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Log4j2
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public CartDto addPlanToCart(CartEntity cart, PlanEntity plan) {
        Set<PlanEntity> planEntitySet = cart.getPlans();
        if(planEntitySet == null) planEntitySet = new HashSet<>();
        planEntitySet.add(plan);
        cartRepository.save(cart);
        return cart.convertToDTO();
    }

    @Override
    public CartDto removePlanFromCart(CartEntity cart, PlanEntity planEntity) {
        Set<PlanEntity> planEntitySet = cart.getPlans();
        planEntitySet.remove(planEntity);
        cartRepository.save(cart);

        return cart.convertToDTO();
    }
}
