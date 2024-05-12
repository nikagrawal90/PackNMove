package com.example.packnmove.entity;

import com.example.packnmove.model.PlanDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "plans")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id")
    private Long planId;
    private String planName;
    private String planDescription;
    private Double planPrice;
    private String imagePath;

    public PlanDto convertToDto() {
        return PlanDto.builder()
                .planId(planId)
                .planName(planName)
                .planDescription(planDescription)
                .planPrice(planPrice)
                .imagePath(imagePath)
                .build();
    }
}
