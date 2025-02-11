package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Department;
import com.longtran.commonservice.models.entity.Item;
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


    void deleteByUsername(String username);

    @Query("SELECT u FROM User u WHERE "
            + "(:username IS NULL OR LOWER(u.username) LIKE LOWER(CONCAT('%', :username, '%'))) AND "
            + "(:lastName IS NULL OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :lastName, '%'))) AND "
            + "(:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND "
            + "(:phoneNumber IS NULL OR LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :phoneNumber, '%')))")
    Page<User> searchUsers(@Param("username") String departmentCode,
                                       @Param("lastName") String lastname,
                                       @Param("email") String email,
                                       @Param("phoneNumber") String phoneNumber,
                                       Pageable pageable);
}
