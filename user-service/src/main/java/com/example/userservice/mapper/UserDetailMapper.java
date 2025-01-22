package com.example.userservice.mapper;

import com.example.userservice.model.dto.request.UserCreationRequest;
import com.example.userservice.model.dto.request.UserDetailRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserDetailMapper {
    UserDetailRequest toUserDetailRequest(UserCreationRequest userDetailRequest);
}
