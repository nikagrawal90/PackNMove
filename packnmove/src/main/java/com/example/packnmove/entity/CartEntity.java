package com.example.packnmove.entity;

import com.example.packnmove.model.CartDto;
import com.example.packnmove.model.PlanDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "cart")
public class CartEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "cart_id")
    private Long cartId;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Column(name = "items")
    @JoinTable(name = "cart_plans", joinColumns = {@JoinColumn(name = "cart_id")}, inverseJoinColumns = {@JoinColumn(name = "plan_id")})
    private Set<PlanEntity> plans;

    public CartDto convertToDTO() {
        List<PlanDto> planDtoSet = plans.stream().map(PlanEntity::convertToDto).collect(Collectors.toList());
        return CartDto.builder()
                .cartId(cartId)
                .plans(planDtoSet)
                .build();
    }
}
