package com.longtran.commonservice.models.dtos.response;


import com.fasterxml.jackson.annotation.JsonProperty;

import com.longtran.commonservice.models.entity.Department;
import com.longtran.commonservice.models.entity.User;
import com.longtran.commonservice.models.entity.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {


    private Long userId;

    private String username;

    private String email;

    private String phoneNumber;

    private String firstName;

    private String lastName;

    private String departmentName;

    private Integer status;

    private String avatarUrl;

}
