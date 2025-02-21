package com.longtran.workservice.controller;

import com.longtran.commons.models.dtos.response.ResponseObject;
import com.longtran.workservice.models.dtos.request.WorkTypeRequest;
import com.longtran.workservice.models.dtos.request.WorkTypeSearchRequest;
import com.longtran.workservice.models.dtos.response.WorkOrderListResponse;
import com.longtran.workservice.models.dtos.response.WorkTypeListResponse;
import com.longtran.workservice.models.dtos.response.WorkTypeNameResponse;
import com.longtran.workservice.models.dtos.response.WorkTypeResponse;
import com.longtran.workservice.models.entity.WorkType;
import com.longtran.workservice.services.worktype.WorkTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/workType")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkTypeController {
    ModelMapper modelMapper;
    WorkTypeService workTypeService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getWorkTypeById(@PathVariable Long id) {
        WorkTypeResponse workTypeResponse = workTypeService.getWorkTypeById(id);
        return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Work type by id: "+ id)
                        .result(workTypeResponse)
                .build());
    }

    @PostMapping
    public ResponseEntity<ResponseObject> addWorkType(@RequestBody WorkTypeRequest workTypeRequest) {
        WorkType workType = workTypeService.addWorkType(workTypeRequest);
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Added new work type")
                .result(workType)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateWorkType(@PathVariable Long id, @RequestBody WorkTypeRequest workTypeRequest) {
        WorkType workType = workTypeService.updateWorkType(id, workTypeRequest);
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Updated work type with id: " + id)
                .result(workType)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteWorkType(@PathVariable Long id) {
        workTypeService.deleteWorkType(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/search")
    public ResponseEntity<ResponseObject> searchWorkTypes(@RequestBody WorkTypeSearchRequest workTypeSearchRequest) {
        WorkTypeListResponse workTypeListResponse = workTypeService.searchWorkTypes(workTypeSearchRequest);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Search results for work types")
                        .result(workTypeListResponse)
                .build());
    }

    @GetMapping("/listName")
    public ResponseEntity<ResponseObject> getWorkTypeNameList() {
        List<WorkTypeNameResponse> workTypeNameResponses=workTypeService.getAllWorkTypeNames();
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Search results for work types")
                        .result(workTypeNameResponses)
                        .build());
    }
}
