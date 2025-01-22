package com.longtran.commonservice.repositories;

import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Page<Department> findAll(Pageable pageable);//phân trang





    @Query("SELECT d FROM Department d WHERE "
            + "(:departmentCode IS NULL OR LOWER(d.departmentCode) LIKE LOWER(CONCAT('%', :departmentCode, '%'))) AND "
            + "(:departmentName IS NULL OR LOWER(d.departmentName) LIKE LOWER(CONCAT('%', :departmentName, '%')))")
    Page<Department> searchDepartments(@Param("departmentCode") String departmentCode,
                                       @Param("departmentName") String departmentName,
                                       Pageable pageable);



}
