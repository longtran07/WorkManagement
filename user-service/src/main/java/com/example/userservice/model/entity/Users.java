package com.example.userservice.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Builder
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Users {
     @Id
     @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_seq")
     @SequenceGenerator(name = "users_seq", sequenceName = "USERS_SEQ", allocationSize = 1)
     @Column(name = "user_id", nullable = false, updatable = false)
     private Long userId;

     @Column(name = "username", length = 500)
     private String username;

     @Column(name = "password", length = 100)
     private String password;
}
