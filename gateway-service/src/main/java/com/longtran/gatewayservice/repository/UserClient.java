package com.longtran.gatewayservice.repository;

import com.longtran.commons.models.dtos.response.ApiResponse;
import com.longtran.gatewayservice.dtos.request.IntrospectRequest;
import com.longtran.gatewayservice.dtos.response.IntrospectResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;

public interface UserClient {
    @PostExchange(url = "/auth/introspect", contentType = MediaType.APPLICATION_JSON_VALUE)
    Mono<ApiResponse<IntrospectResponse>> introspect(@RequestBody IntrospectRequest request);
}
