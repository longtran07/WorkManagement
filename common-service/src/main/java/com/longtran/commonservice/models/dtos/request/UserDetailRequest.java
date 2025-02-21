package com.longtran.commonservice.models.dtos.request;

import kotlin.BuilderInference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailRequest {
    private Long userId;

    private String username;

    private String email;

    private String phoneNumber;

}
