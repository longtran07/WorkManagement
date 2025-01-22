package com.longtran.commonservice.controllers;

import com.longtran.commonservice.models.dtos.request.UsersRequest;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.ResponseObject;
import com.longtran.commonservice.models.dtos.response.UserResponse;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.User;
import com.longtran.commonservice.services.users.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        ResponseObject responseObject = ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Success")
                .result(user)
                .build();
        return ResponseEntity.ok().body(responseObject);
    }


    @PostMapping("")
    public ResponseEntity<ResponseObject> createUser(@RequestBody UsersRequest usersRequest) {
        User user = userService.createUser(usersRequest);
        ResponseObject responseObject = ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Success")
                .result(user)
                .build();
        return ResponseEntity.ok().body(responseObject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateUser(@PathVariable Long id, @RequestBody UsersRequest usersRequest) {
        User user = userService.updateUser(id, usersRequest);
        ResponseObject responseObject = ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Success")
                .result(user)
                .build();
        return ResponseEntity.ok().body(responseObject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        ResponseObject responseObject = ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Delete user successfully")
                .build();
        return ResponseEntity.ok().body(responseObject);
    }

    @DeleteMapping("/delete-account/{username}")
    public ResponseEntity<ResponseObject> deleteUserByUsername(@PathVariable String username) {
        userService.deleteUserByUsername(username);
        ResponseObject responseObject = ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Delete user successfully")
                .build();
        return ResponseEntity.ok().body(responseObject);
    }


//    @GetMapping
//    public ResponseEntity<ResponseObject> getAllUsers(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<User> usersPage = userService.getAllUsers(pageable);
//
//        ResponseObject responseObject = ResponseObject.builder()
//                .status(HttpStatus.OK)
//                .message("Success")
//                .result(usersPage)
//                .build();
//        return ResponseEntity.ok().body(responseObject);
//    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllCategories() {
        List<User> users= userService.getAllUsers();
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all categories")
                .result(
                        users
                                .stream()
                                .map(user ->
                                        modelMapper.map(user, UserResponse.class))
                                .collect(Collectors.toList())

                )
                .build());
    }
}