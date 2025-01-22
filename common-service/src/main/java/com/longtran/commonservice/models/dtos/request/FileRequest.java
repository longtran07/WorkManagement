package com.longtran.commonservice.models.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileRequest {
        @JsonProperty("file_name")
        private String fileName;

        @JsonProperty("file_path")
        private String filePath;

        @JsonProperty("business_code")
        private String businessCode;

        @JsonProperty("business_id")
        private Long businessId;

        @JsonProperty("status")
        private Integer status;

}
