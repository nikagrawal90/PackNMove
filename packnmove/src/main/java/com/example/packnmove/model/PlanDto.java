package com.example.packnmove.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanDto {
    private Long planId;
    private String planName;
    private String planDescription;
    private Double planPrice;
    private String imagePath;
}
