package com.example.packnmove.service;

import com.example.packnmove.entity.PlanEntity;
import com.example.packnmove.model.PlanDto;

import java.util.List;

public interface PlansService {
    List<PlanDto> getPlans();
    PlanDto addPlan(PlanDto planDto);

    PlanEntity getPlanById(Long planId);
    Boolean removePlanById(Long planId);
}
