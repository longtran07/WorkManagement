package com.longtran.commonservice.services.users;

import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.SearchUserRequest;
import com.longtran.commonservice.models.dtos.request.UserDetailRequest;
import com.longtran.commonservice.models.dtos.request.UsersRequest;
import com.longtran.commonservice.models.dtos.request.department.UpdateUserDetailRequest;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.UserListResponse;
import com.longtran.commonservice.models.dtos.response.UserResponse;
import com.longtran.commonservice.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    User getUserById(Long id);
    User getUserByUsername(String username);
    User createUser(UsersRequest usersRequest);
    User createUserDetail(UserDetailRequest userDetailRequest);
    User updateUser(Long id, UsersRequest usersRequest);
    User updateUserDetail(String username, UpdateUserDetailRequest usersRequest);
    void deleteUser(Long id);
    void deleteUserByUsername(String Username);
    void updateUserAvatar(Long userId, String avatarUrl);
    void removeUserAvatar(Long userId);
//    Page<User> getAllUsers(Pageable pageable);
//    List<User> getAllUsers();


    void deleteByUsername(String username);
    void deleteUsers(DeleteRequest deleteRequest);
    UserListResponse searchUsers(SearchUserRequest searchUserRequest);
}
