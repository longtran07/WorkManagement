package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilesRepository extends JpaRepository<Files, Long> {
}
