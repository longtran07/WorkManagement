package com.longtran.commonservice.services.users;

import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.UsersRequest;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.UserResponse;
import com.longtran.commonservice.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    User getUserById(Long id);
    User createUser(UsersRequest usersRequest);
    User updateUser(Long id, UsersRequest usersRequest);
    void deleteUser(Long id);
    void deleteUserByUsername(String Username);
//    Page<User> getAllUsers(Pageable pageable);
//    List<User> getAllUsers();


    void deleteByUsername(String username);
    void deleteUsers(DeleteRequest deleteRequest);
    Page<UserResponse> searchUsers(String username,
                                   String lastName,
                                   String email,
                                   String phoneNumber,
                                  Pageable  pageable);
}
