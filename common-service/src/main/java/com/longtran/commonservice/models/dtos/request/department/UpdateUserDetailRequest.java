package com.longtran.commonservice.models.dtos.request.department;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UpdateUserDetailRequest {

    private String username;

    private String email;

    private String phoneNumber;

    private String firstName;

    private String lastName;

    private Long departmentId;
}
