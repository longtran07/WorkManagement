package com.longtran.commonservice.models.dtos.response;


import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("user_id")
    private Long userId;

    private String username;

    private String email;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    private Integer status;

}
