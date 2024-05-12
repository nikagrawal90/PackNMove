package com.example.packnmove.service;

import com.example.packnmove.entity.PlanEntity;
import com.example.packnmove.model.PlanDto;
import com.example.packnmove.repository.PlansRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class PlansServiceImpl implements PlansService{
    private final PlansRepository plansRepository;
    public PlansServiceImpl(PlansRepository plansRepository) {
        this.plansRepository = plansRepository;
    }

    @Override
    public List<PlanDto> getPlans() {
        List<PlanEntity> planEntities = plansRepository.findAll();

        return planEntities.stream().map(PlanEntity::convertToDto).toList();
    }

    public PlanEntity getPlanById(Long planId) {
        return plansRepository.findById(planId).orElseThrow();
    }

    @Override
    public Boolean removePlanById(Long planId) {
        try{
            plansRepository.deleteById(planId);
            return Boolean.TRUE;
        }
        catch (Exception e) {
            log.error(e);
            return Boolean.FALSE;
        }
    }

    @Override
    public PlanDto addPlan(PlanDto planDto) {
        PlanEntity planEntity = PlanEntity.builder().build();
        BeanUtils.copyProperties(planDto, planEntity);
        plansRepository.save(planEntity);
        planDto.setPlanId(planEntity.getPlanId());
        return planDto;
    }
}
