package com.example.packnmove.repository;

import com.example.packnmove.entity.PlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlansRepository extends JpaRepository<PlanEntity, Long> {
}
