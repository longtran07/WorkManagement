package com.longtran.commonservice.controllers;

import com.longtran.commons.integration.minio.MinioChanel;
import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.SearchUserRequest;
import com.longtran.commonservice.models.dtos.request.UserDetailRequest;
import com.longtran.commonservice.models.dtos.request.UsersRequest;
import com.longtran.commonservice.models.dtos.request.department.UpdateUserDetailRequest;
import com.longtran.commonservice.models.dtos.response.*;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.User;
import com.longtran.commonservice.repositories.UsersRepository;
import com.longtran.commonservice.services.users.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserController {
    UserService userService;
    ModelMapper modelMapper;
    MinioChanel minioChanel;
    UsersRepository usersRepository;

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

    @PostMapping("register")
    public ResponseEntity<ResponseObject> createUserDetail(@RequestBody UserDetailRequest usersRequest) {
        User user = userService.createUserDetail(usersRequest);
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



    @PutMapping("detail/{username}")
    public ResponseEntity<ResponseObject> updateUserDetail(@PathVariable String username, @RequestBody UpdateUserDetailRequest usersRequest) {
        try{
            User user = userService.updateUserDetail(username, usersRequest);
            ResponseObject responseObject = ResponseObject.builder()
                    .status(HttpStatus.OK)
                    .message("Success")
                    .result(user)
                    .build();
            return ResponseEntity.ok().body(responseObject);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject(HttpStatus.BAD_REQUEST, e.getMessage(), null));
        }
    }


    @GetMapping("/username/{username}")
    public ResponseEntity<ResponseObject> getUserDetail(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        ResponseObject responseObject = ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Success")
                .result(modelMapper.map(user, UserResponse.class))
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


    @PostMapping("/{userId}/avatar")
    public ResponseEntity<ResponseObject> uploadAvatar(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String fileName = "avatar_" + userId + "_" + file.getOriginalFilename();
            String avatarUrl = minioChanel.upload(file);
            userService.updateUserAvatar(userId, avatarUrl);
            return ResponseEntity.ok().body(ResponseObject.builder()
                    .message("Avatar updated successfully").build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    ResponseObject.builder()
                            .message("Error occurred while updating avatar: " + e.getMessage()).build()
            );
        }
    }


    @PostMapping("/search")
    public ResponseEntity<ResponseObject> searchUsers(
           @RequestBody SearchUserRequest searchUserRequest) {
        UserListResponse userListResponse = userService.searchUsers(searchUserRequest);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Users")
                .result(userListResponse)
                .build());
    }

    @DeleteMapping("/delete-by-username/{username}")
    public ResponseEntity<ResponseObject> deleteByUsername(@PathVariable("username") String username) {
        userService.deleteByUsername(username);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("User deleted successfully")
                .build());
    }

    @DeleteMapping("/batch")
    public ResponseEntity<ResponseObject> deleteUsers(@RequestBody DeleteRequest request) {

        userService.deleteUsers(request);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Deleted Category "+ request.getIds().toString() +" successfully")
                .build());
    }

    @DeleteMapping("/{userId}/avatar")
    public ResponseEntity<String> deleteAvatar(@PathVariable Long userId) {
        try {
            // Lấy thông tin người dùng để lấy URL của ảnh avatar
            Optional<User> userOpt = usersRepository.findById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                String avatarUrl = user.getAvatarUrl();

                if (avatarUrl != null) {
                    // Lấy tên tệp từ URL để xóa
                    String fileName = avatarUrl.substring(avatarUrl.lastIndexOf("/") + 1, avatarUrl.indexOf("?"));
                    minioChanel.deleteFile(fileName);
                    userService.removeUserAvatar(userId);
                    return ResponseEntity.ok("Avatar deleted successfully");
                } else {
                    return ResponseEntity.badRequest().body("No avatar to delete");
                }
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error occurred while deleting avatar: " + e.getMessage());
        }
    }


}