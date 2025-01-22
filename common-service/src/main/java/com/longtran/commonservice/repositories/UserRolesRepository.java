package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRolesRepository extends JpaRepository<UserRole, Long> {

}
