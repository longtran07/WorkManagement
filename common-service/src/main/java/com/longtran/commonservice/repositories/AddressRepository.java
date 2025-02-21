package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Address;
import com.longtran.commonservice.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findByUserUserId(Long user_userId);
}
