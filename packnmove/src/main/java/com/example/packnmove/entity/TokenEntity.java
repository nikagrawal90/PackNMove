package com.example.packnmove.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "token")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;
    private String token;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH})
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity user;
}
