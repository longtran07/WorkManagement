package com.example.userservice.service;

import com.example.userservice.model.dto.request.UserCreationRequest;
import com.example.userservice.model.dto.request.UserUpdatePasswordRequest;
import com.example.userservice.model.dto.response.UserResponse;

public interface UserService {
    UserResponse createUser(UserCreationRequest request);

    UserResponse updatePassword(String userId, UserUpdatePasswordRequest request);

    void deleteUser(String userId);

}
