package com.longtran.commonservice.services.users;

import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commons.exceptions.ExistingEntityException;
import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.SearchUserRequest;
import com.longtran.commonservice.models.dtos.request.UserDetailRequest;
import com.longtran.commonservice.models.dtos.request.UsersRequest;
import com.longtran.commonservice.models.dtos.request.department.UpdateUserDetailRequest;
import com.longtran.commonservice.models.dtos.response.ItemResponse;
import com.longtran.commonservice.models.dtos.response.UserListResponse;
import com.longtran.commonservice.models.dtos.response.UserResponse;
import com.longtran.commonservice.models.entity.Department;
import com.longtran.commonservice.models.entity.Item;
import com.longtran.commonservice.models.entity.User;
import com.longtran.commonservice.repositories.DepartmentRepository;
import com.longtran.commonservice.repositories.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserServiceImpl implements UserService {
    UsersRepository usersRepository;
    ModelMapper modelMapper;
    DepartmentRepository departmentRepository;
    @Override
    public User getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("User with id " + id + " not found")
        );
    }

    @Override
    public User getUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }


    @Override
    public User createUser(UsersRequest usersRequest) {
        if(usersRepository.existsByEmail(usersRequest.getEmail())) {
            throw new ExistingEntityException("Email " + usersRequest.getEmail() + " already exists");
        }

        if(usersRepository.existsByUsername(usersRequest.getUsername())) {
            throw new ExistingEntityException("Username " + usersRequest.getUsername() + " already exists");
        }

        if(usersRepository.existsByPhoneNumber(usersRequest.getPhoneNumber())) {
            throw new ExistingEntityException("Phone number " + usersRequest.getPhoneNumber() + " already exists");
        }

        Department department=departmentRepository
                .findById(usersRequest.getDepartmentId())
                .orElseThrow(()-> new DataNotFoundException("Department with id " + usersRequest.getDepartmentId() + " not found")
                );
        User user = User.builder()
                .username(usersRequest.getUsername())
                .email(usersRequest.getEmail())
                .phoneNumber(usersRequest.getPhoneNumber())
                .firstName(usersRequest.getFirstName())
                .lastName(usersRequest.getLastName())
                .department(department)
                .status(usersRequest.getStatus())
                .build();

        return usersRepository.save(user);
    }

    @Override
    public User createUserDetail(UserDetailRequest usersRequest) {
        if(usersRepository.existsByEmail(usersRequest.getEmail())) {
            throw new ExistingEntityException("Email " + usersRequest.getEmail() + " already exists");
        }

        if(usersRepository.existsByUsername(usersRequest.getUsername())) {
            throw new ExistingEntityException("Username " + usersRequest.getUsername() + " already exists");
        }

        if(usersRepository.existsByPhoneNumber(usersRequest.getPhoneNumber())) {
            throw new ExistingEntityException("Phone number " + usersRequest.getPhoneNumber() + " already exists");
        }

        User user = User.builder()
                .username(usersRequest.getUsername())
                .email(usersRequest.getEmail())
                .phoneNumber(usersRequest.getPhoneNumber())
                .status(1)
                .build();

        return usersRepository.save(user);
    }

    @Override
    public User updateUser(Long id, UsersRequest usersRequest) {
        User user = usersRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("User with id " + id + " not found")
        );
        if(usersRepository.existsByPhoneNumberAndUserIdNot(usersRequest.getPhoneNumber(),id)) {
            user.setPhoneNumber(usersRequest.getPhoneNumber());
        }
        else throw new ExistingEntityException("Phone number " + usersRequest.getPhoneNumber() + " already exists");
        if(usersRepository.existsByUsernameAndUserIdNot(usersRequest.getUsername(),id)) {
            user.setUsername(usersRequest.getUsername());
        }
        else throw new ExistingEntityException("Username " + usersRequest.getUsername() + " already exists");
        if(usersRepository.existsByEmailAndUserIdNot(usersRequest.getEmail(),id)) {
            user.setEmail(usersRequest.getEmail());
        }
        else throw new ExistingEntityException("Email number " + usersRequest.getEmail() + " already exists");

        user.setFirstName(usersRequest.getFirstName());
        user.setLastName(usersRequest.getLastName());
        user.setStatus(usersRequest.getStatus());
        return usersRepository.save(user);
    }

    @Override
    public User updateUserDetail(String username, UpdateUserDetailRequest usersRequest) {
        User user = usersRepository.findByUsername(username);
        if (user == null) {
            throw new DataNotFoundException("User with username " + username + " not found");
        }

        Department department=departmentRepository.findById(usersRequest.getDepartmentId()).orElseThrow(
                ()-> new DataNotFoundException("Department with id " +usersRequest.getDepartmentId()  + " not found")
        );

        if (usersRepository.existsByEmail(usersRequest.getEmail()) && !user.getEmail().equals(usersRequest.getEmail())) {
            throw new ExistingEntityException("Email " + usersRequest.getEmail() + " already exists");
        }

        if (usersRepository.existsByUsername(usersRequest.getUsername()) && !user.getUsername().equals(usersRequest.getUsername())) {
            throw new ExistingEntityException("Username " + usersRequest.getUsername() + " already exists");
        }

        if (usersRepository.existsByPhoneNumber(usersRequest.getPhoneNumber()) && !user.getPhoneNumber().equals(usersRequest.getPhoneNumber())) {
            throw new ExistingEntityException("Phone number " + usersRequest.getPhoneNumber() + " already exists");
        }

        user.setFirstName(usersRequest.getFirstName());
        user.setLastName(usersRequest.getLastName());
        user.setDepartment(department);
        return usersRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        User user = usersRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("User with id " + id + " not found")
        );
        usersRepository.delete(user);
    }

    @Override
    public void deleteUserByUsername(String username) {
        User user = usersRepository.findByUsername(username);
        usersRepository.delete(user);
    }

    @Override
    @Transactional
    public void deleteByUsername(String username) {
        usersRepository.deleteByUsername(username);

    }

    @Override
    public void deleteUsers(DeleteRequest deleteRequest) {
        List<Long> ids = deleteRequest.getIds();
        for (Long id : ids) {
            usersRepository.findById(id).orElseThrow(
                    () -> new DataNotFoundException("Item with id " + id + " not found")
            );
            deleteUser(id);

        }
    }

    @Override
    public UserListResponse searchUsers(SearchUserRequest searchUserRequest) {
        Page<User> userPage = usersRepository.searchUsers(
                searchUserRequest.getUsername(),
                searchUserRequest.getEmail(),
                searchUserRequest.getPhoneNumber(),
                searchUserRequest.getLastName(),
                PageRequest.of(searchUserRequest.getPage(), searchUserRequest.getSize()));


        Page<UserResponse> userResponsePage=userPage
                .map(
                user -> {
                    UserResponse userResponse = modelMapper.map(user,UserResponse.class);
                    if (user.getDepartment() != null) {
                        userResponse.setDepartmentName(user.getDepartment().getDepartmentName());
                    }
                    return userResponse;
                });


        return UserListResponse.builder()
                .userResponses(userResponsePage.getContent())
                .totalPages(userResponsePage.getTotalPages())
                .currentPage(userResponsePage.getNumber())
                .pageSize(userResponsePage.getSize())
                .totalItems(userResponsePage.getTotalElements())
                .isFirst(userResponsePage.isFirst())
                .isLast(userResponsePage.isLast())
                .hasNext(userResponsePage.hasNext())
                .hasPrevious(userResponsePage.hasPrevious())
                .build();
    }
    @Override
    public void updateUserAvatar(Long userId, String avatarUrl) {
        Optional<User> userOpt = usersRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setAvatarUrl(avatarUrl);
            usersRepository.save(user);
        } else {
            throw new DataNotFoundException("User with ID " + userId + " not found");
        }
    }
    @Override
    public void removeUserAvatar(Long userId) {
        Optional<User> userOpt = usersRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setAvatarUrl(null);
            usersRepository.save(user);
        } else {
            throw new DataNotFoundException("User with ID " + userId + " not found");
        }
    }

}
