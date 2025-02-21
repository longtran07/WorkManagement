package com.longtran.commonservice.models.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsersRequest {

    private String username;

    private String email;

    private String phoneNumber;

    private String firstName;

    private String lastName;

    private Long departmentId;

    private Integer status;
}
