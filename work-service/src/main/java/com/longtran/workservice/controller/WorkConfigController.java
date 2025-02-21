package com.longtran.workservice.controller;

import com.longtran.commons.models.dtos.response.ResponseObject;
import com.longtran.workservice.models.dtos.request.WorkConfigRequest;
import com.longtran.workservice.models.dtos.request.WorkConfigSearchRequest;
import com.longtran.workservice.models.dtos.response.WorkConfigListResponse;
import com.longtran.workservice.models.dtos.response.WorkConfigResponse;
import com.longtran.workservice.models.entity.WorkConfig;
import com.longtran.workservice.services.workconfig.WorkConfigService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/workConfig")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)

public class WorkConfigController {

    ModelMapper modelMapper;
    WorkConfigService workConfigService;

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getWorkConfig(@PathVariable Long id) {
        WorkConfig workConfig = workConfigService.getWorkConfig(id);
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Work type by id: "+ id)
                .result(modelMapper.map(workConfig, WorkConfigResponse.class))
                .build());
    }

    @PostMapping
    public ResponseEntity<ResponseObject> addWorkConfig(@RequestBody WorkConfigRequest workConfigRequest) {
        WorkConfig workConfig = workConfigService.addWorkConfig(workConfigRequest);
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Added new work configuration")
                .result(workConfig)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateWorkConfig(@PathVariable Long id, @RequestBody WorkConfigRequest workConfigRequest) {
        WorkConfig workConfig = workConfigService.updateWorkConfig(id, workConfigRequest);
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Updated work config with id: " + id)
                .result(workConfig)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteWorkConfig(@PathVariable Long id) {
        workConfigService.deleteWorkConfig(id);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .message("Deleted work config with id: " + id)
                        .build()
        );
    }

    @PostMapping("/search")
    public ResponseEntity<ResponseObject> searchWorkConfigs(@RequestBody WorkConfigSearchRequest workConfigSearchRequest) {
        WorkConfigListResponse workConfigListResponse = workConfigService.searchWorkConfigs(workConfigSearchRequest);
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Search results for work configs")
                        .result(workConfigListResponse)
                        .build());
    }
}
