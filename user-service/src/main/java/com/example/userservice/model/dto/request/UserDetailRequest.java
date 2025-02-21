package com.example.userservice.model.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailRequest {
    private String username;

    private String email;

    private String phoneNumber;

}
