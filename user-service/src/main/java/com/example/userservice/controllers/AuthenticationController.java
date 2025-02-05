package com.example.userservice.controllers;

import com.example.userservice.model.dto.request.AuthenticationRequest;
import com.example.userservice.model.dto.request.IntrospectRequest;
import com.example.userservice.service.AuthenticationService;
import com.longtran.commons.models.dtos.response.ResponseObject;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/token")
    ResponseEntity<ResponseObject> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.ACCEPTED)
                        .message("Login successful")
                        .result(result)
                        .build()
        );
    }

    @PostMapping("/introspect")
    ResponseEntity<ResponseObject> authenticate(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                .result(result)
                .build());
    }
}
