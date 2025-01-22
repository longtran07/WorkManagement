package com.example.userservice.repository.httpclient;


import com.example.userservice.model.dto.request.UserDetailRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="common-service",url = "localhost:8801/common/api/v1")
public interface UserDetailClient {
    @PostMapping(value = "/users",produces = MediaType.APPLICATION_JSON_VALUE)
    Object creatUserDetail(@RequestBody UserDetailRequest userDetail);

    @DeleteMapping("/users/delete-account/{username}")
    ResponseEntity<Object> deleteUserByUsername(@PathVariable("username") String username);
}
