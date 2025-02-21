package com.example.userservice.service;

import com.example.userservice.mapper.UserDetailMapper;
import com.example.userservice.mapper.UserMapper;
import com.example.userservice.model.dto.request.UserDetailRequest;
import com.example.userservice.model.entity.Users;
import com.example.userservice.repository.httpclient.UserDetailClient;
import com.longtran.commons.exceptions.ExistingEntityException;
import com.example.userservice.model.dto.request.UserCreationRequest;
import com.example.userservice.model.dto.request.UserUpdatePasswordRequest;
import com.example.userservice.model.dto.response.UserResponse;
import com.example.userservice.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Log4j2
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;
    UserDetailMapper userDetailMapper;
    UserDetailClient userDetailClient;

    @Override
    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername()))
            throw new ExistingEntityException("Username already exists");

        Users user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user =  userRepository.save(user);
        UserDetailRequest userDetailRequest = userDetailMapper.toUserDetailRequest(request);
        try {
            log.info("Sending request to create user detail: {}", userDetailRequest);

            userDetailClient.creatUserDetail(userDetailRequest);
        } catch (Exception e) {
            // Nếu API call thất bại, rollback user vừa tạo
            userRepository.delete(user);
            throw new RuntimeException("Failed to create user detail", e);
        }
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse updatePassword(String userId, UserUpdatePasswordRequest request) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

//        if (!isValidPassword(request.getNewPassword())) {
//            throw new RuntimeException("New password does not meet the required criteria");
//        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

            return userMapper.toUserResponse(userRepository.save(user));

    }

    @Override
    public void deleteUser(String userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        userRepository.deleteById(userId);
    }

    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        Users user = userRepository.findByUsername(name).orElseThrow(
                () -> new ExistingEntityException("USER_NOT_EXISTED"));

        return userMapper.toUserResponse(user);
    }
}
