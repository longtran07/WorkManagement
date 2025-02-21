package com.longtran.commonservice.controllers;

import com.longtran.commonservice.models.dtos.request.DeleteRequest;
import com.longtran.commonservice.models.dtos.request.department.DepartmentRequest;
import com.longtran.commonservice.models.dtos.response.*;
import com.longtran.commonservice.models.entity.Department;
import com.longtran.commonservice.services.department.DepartmentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/department")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class DepartmentController {
    DepartmentService departmentService;
    ModelMapper modelMapper;

    @GetMapping("/page")
    public ResponseEntity<ResponseObject> getAllDepartmentsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<DepartmentResponse> departmentResponsePage = departmentService.getAllDepartmentsPage(page, size);


        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Departments")
                .result(
                        DepartmentListResponse.builder()
                        .departmentResponses(departmentResponsePage.getContent())
                        .totalPages(departmentResponsePage.getTotalPages())
                        .currentPage(departmentResponsePage.getNumber())
                        .pageSize(departmentResponsePage.getSize())
                        .totalItems(departmentResponsePage.getTotalElements())
                        .isFirst(departmentResponsePage.isFirst())
                        .isLast(departmentResponsePage.isLast())
                        .hasNext(departmentResponsePage.hasNext())
                        .hasPrevious(departmentResponsePage.hasPrevious())
                        .build()
                ) // Sử dụng content của Page object
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllDepartments(

    ) {
        List<DepartmentResponse> departmentResponses = departmentService.getAllDepartments();


        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Departments")
                .result(departmentResponses)
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchDepartments(
            @RequestParam(required = false) String departmentCode,
            @RequestParam(required = false) String departmentName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size ) {
        Page<DepartmentResponse> departmentResponsePage = departmentService.searchDepartments(
                        departmentCode,
                        departmentName,
                        page,
                        size);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Departments")
                .result(
                        DepartmentListResponse.builder()
                                .departmentResponses(departmentResponsePage.getContent())
                                .totalPages(departmentResponsePage.getTotalPages())
                                .currentPage(departmentResponsePage.getNumber())
                                .pageSize(departmentResponsePage.getSize())
                                .totalItems(departmentResponsePage.getTotalElements())
                                .isFirst(departmentResponsePage.isFirst())
                                .isLast(departmentResponsePage.isLast())
                                .hasNext(departmentResponsePage.hasNext())
                                .hasPrevious(departmentResponsePage.hasPrevious())
                                .build()
                ) // Sử dụng content của Page object
                .build());
    }


    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getDepartmentById(
            @PathVariable("id") Long id) {
        DepartmentResponse departmentResponse = departmentService.getDepartmentById(id);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Department with id "+ id)
                        .result(departmentResponse)
                        .build()
        );
    }
    @PostMapping("")
    public ResponseEntity<ResponseObject> createDepartment(
            @RequestBody DepartmentRequest departmentRequest) {
        Department department = departmentService.createDepartment(departmentRequest);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.CREATED)
                        .message("Department created")
                        .result(department)
                        .build()
        );
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDepartment(
            @PathVariable("id") Long id,
            @RequestBody DepartmentRequest departmentRequest) {
        Department department = departmentService.updateDepartment(id, departmentRequest);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Department updated")
                        .result(department)
                        .build()
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteDepartment(@PathVariable("id") Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok().body(ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Department deleted successfully")
                .build());
    }


    @DeleteMapping("/delete-by-department-code/{department_code}")
    public ResponseEntity<ResponseObject> deleteByDepartmentCode(@PathVariable("department_code") String departmentCode) {
        departmentService.deleteByDepartmentCode(departmentCode);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Department deleted successfully")
                .build());
    }

    @DeleteMapping("/batch")
    public ResponseEntity<ResponseObject> deleteDepartments(@RequestBody DeleteRequest request) {

            departmentService.deleteDepartments(request);
            return ResponseEntity.ok().body(ResponseObject.builder()
                    .status(HttpStatus.OK)
                    .message("Deleted department "+ request.getIds().toString() +" successfully")
                    .build());
    }

}
