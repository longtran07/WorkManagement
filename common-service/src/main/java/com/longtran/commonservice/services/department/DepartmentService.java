package com.longtran.commonservice.services.department;

import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.department.DepartmentRequest;
import com.longtran.commonservice.models.dtos.response.DepartmentResponse;
import com.longtran.commonservice.models.entity.Department;
import org.springframework.data.domain.Page;

public interface DepartmentService {
    DepartmentResponse getDepartmentById(Long departmentId);
    Page<DepartmentResponse> getAllDepartments(int page, int size);
    Department createDepartment(DepartmentRequest departmentRequest);
    Department updateDepartment(Long departmentId, DepartmentRequest departmentRequest);
    void deleteDepartment(Long departmentId);
    void deleteByDepartmentCode(String departmentCode);
    void deleteDepartments(DeleteRequest deleteRequest);
    Page<DepartmentResponse> searchDepartments(String departmentCode,
                                               String departmentName,
                                               int page, int size);
}
