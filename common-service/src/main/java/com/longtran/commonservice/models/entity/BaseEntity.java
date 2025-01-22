package com.longtran.commonservice.models.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@MappedSuperclass
public class BaseEntity {

    @Column(name = "created_time")
    LocalDateTime createdAt;

    @Column(name = "updated_time")
    LocalDateTime updatedAt;

    @Column(name = "created_user")
    private long createdUser;

    @Column(name = "updated_user")
    private long updatedUser;


    @PrePersist
    protected void onCreate() {
        createdAt = createdAt != null ? createdAt : LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @PostLoad protected void onLoad() { System.out.println("Loaded entity: " + this); }

}
