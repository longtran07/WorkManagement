package com.example.userservice.service;

import com.example.userservice.model.dto.request.AuthenticationRequest;
import com.example.userservice.model.dto.request.IntrospectRequest;
import com.example.userservice.model.dto.response.AuthenticationResponse;
import com.example.userservice.model.dto.response.IntrospectResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {


    /*
    jwt : là 1 json objec
    header  + payload + sign
    header : typ jwt, thuật toán kí
    payload : chứa các claim. data trong body của payload gọi là claim
    vd : subjec : username, issuer: domain, issuerTime
    sign : kí token

     */




    AuthenticationResponse authenticate(AuthenticationRequest request);
    // verifier token
    IntrospectResponse introspect(IntrospectRequest request)  throws JOSEException, ParseException;

}
