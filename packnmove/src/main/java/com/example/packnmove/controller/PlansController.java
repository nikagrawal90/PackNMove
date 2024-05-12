package com.example.packnmove.controller;

import com.example.packnmove.model.PlanDto;
import com.example.packnmove.service.PlansService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:3000")
@RequestMapping("/api/v1/plans")
public class PlansController {
    private final PlansService plansService;
    public PlansController(PlansService plansService) {
        this.plansService = plansService;
    }

    @GetMapping("/getPlans")
    public List<PlanDto> getPlans() {
        return plansService.getPlans();
    }

    @PostMapping("addPlan")
    public PlanDto addPlan(@RequestBody PlanDto planDto) {
        return plansService.addPlan(planDto);
    }

    @DeleteMapping("removePlan")
    public Boolean removePlan(@RequestBody Long planId) {
        return plansService.removePlanById(planId);
    }
}
