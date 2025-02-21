package com.example.userservice.configuration;

import com.example.userservice.model.dto.request.UserDetailRequest;
import com.example.userservice.model.entity.Users;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.repository.httpclient.UserDetailClient;
import com.longtran.commons.exceptions.GlobalExceptionHandler;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;
    UserDetailClient userDetailClient;
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()){

                Users user = Users.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .build();

                userRepository.save(user);
                userDetailClient.creatUserDetail(
                        UserDetailRequest
                                .builder()
                                .username("admin")
                                .email("admin@email.test.vn")

                                .phoneNumber("00000000")

                                .build());
                log.warn("admin user has been created with default password: admin, please change it");
            }
        };
    }

    @Bean
    GlobalExceptionHandler globalExceptionHandler() {
        return new GlobalExceptionHandler();
    }
}
