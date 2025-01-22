package com.longtran.commonservice.services.department;

import com.longtran.commonservice.models.dtos.request.DepartmentRequest;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.DepartmentResponse;
import com.longtran.commonservice.models.entity.Department;
import org.springframework.data.domain.Page;

import java.util.List;

public interface DepartmentService {
    DepartmentResponse getDepartmentById(Long departmentId);
    Page<DepartmentResponse> getAllDepartments(int page, int size);
    Department createDepartment(DepartmentRequest departmentRequest);
    Department updateDepartment(Long departmentId, DepartmentRequest departmentRequest);
    void deleteDepartment(Long departmentId);
    Page<DepartmentResponse> searchDepartments(String departmentCode,
                                               String departmentName,
                                               int page, int size);
}
