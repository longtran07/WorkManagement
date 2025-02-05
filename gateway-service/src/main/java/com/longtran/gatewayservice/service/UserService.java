package com.longtran.gatewayservice.service;

import com.longtran.commons.models.dtos.response.ApiResponse;
import com.longtran.gatewayservice.dtos.request.IntrospectRequest;
import com.longtran.gatewayservice.dtos.response.IntrospectResponse;
import com.longtran.gatewayservice.repository.UserClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserClient userClient;

    public Mono<ApiResponse<IntrospectResponse>> introspect(String token){
        return userClient.introspect(IntrospectRequest.builder()
                .token(token)
                .build());
    }

}
