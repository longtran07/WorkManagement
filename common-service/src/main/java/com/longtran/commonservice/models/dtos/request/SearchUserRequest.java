package com.longtran.commonservice.models.dtos.request;

import lombok.*;
import org.springframework.data.domain.Pageable;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchUserRequest {
    String username;
    String lastName;
    String email;
    String phoneNumber;
    int page;
    int size;
}
