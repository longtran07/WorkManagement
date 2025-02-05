package com.example.userservice.service;

import com.example.userservice.mapper.UserDetailMapper;
import com.example.userservice.mapper.UserMapper;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

        var userDetailRequest = userDetailMapper.toUserDetailRequest(request);
        userDetailClient.creatUserDetail(userDetailRequest);
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse updatePassword(String userId, UserUpdatePasswordRequest request) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(request.getNewPassword());

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
