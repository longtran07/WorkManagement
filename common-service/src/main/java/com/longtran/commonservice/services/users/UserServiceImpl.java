package com.longtran.commonservice.services.users;

import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commons.exceptions.ExistingEntityException;
import com.longtran.commonservice.models.dtos.request.UsersRequest;
import com.longtran.commonservice.models.entity.Department;
import com.longtran.commonservice.models.entity.User;
import com.longtran.commonservice.repositories.DepartmentRepository;
import com.longtran.commonservice.repositories.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final DepartmentRepository departmentRepository;
    @Override
    public User getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("User with id " + id + " not found")
        );
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
    public User updateUser(Long id, UsersRequest usersRequest) {
        User user = usersRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("User with id " + id + " not found")
        );
        if(!usersRepository.existsByEmail(usersRequest.getEmail())) {
            user.setEmail(usersRequest.getEmail());
        }
        else throw new ExistingEntityException("Email " + usersRequest.getEmail() + " already exists");
        if(!usersRepository.existsByUsername(usersRequest.getUsername())) {
            user.setUsername(usersRequest.getUsername());
        }
        else throw new ExistingEntityException("Username " + usersRequest.getUsername() + " already exists");
        if(!usersRepository.existsByPhoneNumber(usersRequest.getPhoneNumber())) {
            user.setPhoneNumber(usersRequest.getPhoneNumber());
        }
        else throw new ExistingEntityException("Phone number " + usersRequest.getPhoneNumber() + " already exists");
        // Nếu cần thiết, mã hóa lại mật khẩu
//        if (usersRequest.getPassword() != null && !usersRequest.getPassword().isEmpty()) {
//            user.setPassword(passwordEncoder.encode(usersRequest.getPassword()));
//        }
        user.setFirstName(usersRequest.getFirstName());
        user.setLastName(usersRequest.getLastName());
        user.setStatus(usersRequest.getStatus());
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
    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }
}
