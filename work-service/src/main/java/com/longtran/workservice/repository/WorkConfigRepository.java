package com.longtran.workservice.repository;

import com.longtran.workservice.models.entity.WorkConfig;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WorkConfigRepository extends JpaRepository<WorkConfig,Long> {
    Page<WorkConfig> findAll(Pageable pageable);

    @Query("SELECT w FROM WorkConfig w WHERE "
            + "(:woTypeId IS NULL OR w.woTypeId = :woTypeId) AND "
            + "(:newStatus IS NULL OR w.newStatus = :newStatus) AND "
            + "(:oldStatus IS NULL OR w.oldStatus = :oldStatus) AND "
            + "(:priorityId IS NULL OR w.priorityId = :priorityId)")
    Page<WorkConfig> searchConfigs(
            @Param("woTypeId") Long woTypeId,
            @Param("priorityId") Long priorityId,
            @Param("oldStatus") Long oldStatus,
            @Param("newStatus") Long newStatus,
            Pageable pageable);

}
