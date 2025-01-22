package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsersRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByUsername(String username);
    User findByUsername(String username);

    Page<User> findAll(Pageable pageable);


    @Query("SELECT u FROM User u where " +
            "(:username is null or :username = '' or u.username LIKE %:username%)  AND" +
            "(:phoneNumber is null or :phoneNumber = '' or u.phoneNumber LIKE %:phoneNumber%)  AND " +
            "(:email is null or :email = '' or u.email LIKE %:email%)  AND" +
            "(:lastName is null or :lastName = '' or u.lastName LIKE %:lastName%) " )

    Page<User> searchUsers(
            @Param("username") String keyword,
            @Param("lastName") String lastName,
            @Param("phoneNumber") String phoneNumber,
            @Param("email") String email,
            Pageable pageable);
}
