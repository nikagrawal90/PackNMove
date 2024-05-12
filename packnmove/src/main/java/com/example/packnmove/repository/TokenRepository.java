package com.example.packnmove.repository;

import com.example.packnmove.entity.TokenEntity;
import com.example.packnmove.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<TokenEntity, Long> {
    @Transactional
    void removeTokenEntityByToken(String token);
    @Transactional
    void removeTokenEntityByUser(UserEntity userEntity);
    boolean existsTokenEntityByToken(String token);
}
