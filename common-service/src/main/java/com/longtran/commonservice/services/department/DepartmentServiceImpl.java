package com.longtran.commonservice.services.department;

import com.longtran.commonservice.models.dtos.request.DepartmentRequest;
import com.longtran.commonlibrary.exceptions.DataNotFoundException;
import com.longtran.commonservice.models.dtos.response.CategoryResponse;
import com.longtran.commonservice.models.dtos.response.DepartmentResponse;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.Department;
import com.longtran.commonservice.repositories.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public DepartmentResponse getDepartmentById(Long departmentId) {
        Department department =departmentRepository.findById(departmentId).orElseThrow(
                ()->new DataNotFoundException("Department with id " + departmentId + " not found")
        ) ;
        return modelMapper.map(department, DepartmentResponse.class);
    }

    @Override
    public Page<DepartmentResponse> getAllDepartments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Department> departmentPage;
        departmentPage=departmentRepository.findAll(pageable);
        return departmentPage.map(department -> modelMapper.map(department, DepartmentResponse.class));
    }

    @Override
    public Page<DepartmentResponse> searchDepartments(String departmentCode,
                                                      String departmentName,
                                                      int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Department> departmentPage = departmentRepository
                .searchDepartments(departmentCode, departmentName, pageable);
        return departmentPage.map(
                department -> modelMapper.map(department, DepartmentResponse.class));
    }

    @Override
    public Department createDepartment(DepartmentRequest departmentRequest) {
        Department department = new Department();
        department.setDepartmentName(departmentRequest.getDepartmentName());
        department.setDepartmentCode(departmentRequest.getDepartmentCode());
        department.setParentDepartmentId(departmentRequest.getParentDepartmentId());
        department.setCreatedUser(1);
        department.setStatus(departmentRequest.getStatus());
        return departmentRepository.save(department);
    }

    @Override
    public Department updateDepartment(Long departmentId, DepartmentRequest departmentRequest) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()->new DataNotFoundException("Department with id " + departmentId + " not found"));
        department.setDepartmentName(departmentRequest.getDepartmentName());
        department.setDepartmentCode(departmentRequest.getDepartmentCode());
        department.setParentDepartmentId(departmentRequest.getParentDepartmentId());
        department.setUpdatedUser(1);
        department.setStatus(departmentRequest.getStatus());
        return departmentRepository.save(department);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()->new DataNotFoundException("Department with id " + departmentId + " not found")
        );
        departmentRepository.delete(department);

    }
}
