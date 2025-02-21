package com.longtran.workservice.repository;

import com.longtran.workservice.models.entity.WorkType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WorkTypeRepository extends JpaRepository<WorkType, Long> {
    Page<WorkType> findAll(Specification<WorkType> spec, Pageable pageable);

    @Query("SELECT w FROM WorkType w WHERE "
            + "(:woTypeCode IS NULL OR LOWER(w.woTypeCode) LIKE LOWER(CONCAT('%', :woTypeCode, '%'))) AND "
            + "(:woTypeName IS NULL OR LOWER(w.woTypeName) LIKE LOWER(CONCAT('%', :woTypeName, '%')))")
    Page<WorkType> searchWorkTypes(
            @Param("woTypeCode") String woTypeCode,
            @Param("woTypeName") String woTypeName,
            Pageable pageable);
}
