package com.longtran.commonservice.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "files")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Files extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "files_seq")
    @SequenceGenerator(name = "files_seq", sequenceName = "FILES_SEQ", allocationSize = 1)
    @Column(name = "file_id", nullable = false, updatable = false)
    private Long fileId;

    @Column(name = "file_name", length = 500)
    private String fileName;

    @Column(name = "file_path", length = 2000)
    private String filePath;

    @Column(name = "business_code", length = 100)
    private String businessCode;

    @Column(name = "business_id")
    private Long businessId;

    @Column(name = "status")
    private Integer status;
}
