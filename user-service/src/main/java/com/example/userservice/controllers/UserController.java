package com.example.userservice.controllers;


import com.example.userservice.model.dto.request.UserCreationRequest;
import com.example.userservice.model.dto.request.UserUpdatePasswordRequest;
import com.example.userservice.model.dto.response.UserResponse;
import com.example.userservice.service.UserService;
import com.longtran.commons.models.dtos.response.ResponseObject;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping
    ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request){
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PutMapping("/{userId}")
    ResponseEntity<UserResponse> updateUser(@PathVariable String userId, @RequestBody UserUpdatePasswordRequest request){
        return ResponseEntity.ok().body(userService.updatePassword(userId, request));
    }

    @DeleteMapping("/{userId}")
    ResponseEntity<ResponseObject> deleteUser(@PathVariable String userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok().body(ResponseObject.builder().message("User has been deleted").build());
    }
}

