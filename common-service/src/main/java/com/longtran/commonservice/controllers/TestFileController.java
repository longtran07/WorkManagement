package com.longtran.commonservice.controllers;

import com.longtran.commons.integration.minio.MinioChanel;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/test")
@RequiredArgsConstructor
public class TestFileController {
    private final MinioChanel minioChanel;

    @PostMapping("")
    ResponseEntity<String> uploadFile(@RequestBody MultipartFile file) {
            String fileName = minioChanel.upload(file);
            return ResponseEntity.ok(fileName);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Resource resource = minioChanel.downloadFile(fileName);
            String contentType = "application/octet-stream";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
