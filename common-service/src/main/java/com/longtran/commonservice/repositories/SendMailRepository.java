package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.SendMail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SendMailRepository extends JpaRepository<SendMail, Long> {
}
