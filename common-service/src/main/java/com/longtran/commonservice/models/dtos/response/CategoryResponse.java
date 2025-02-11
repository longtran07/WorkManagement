package com.longtran.commonservice.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.longtran.commonservice.models.entity.Category;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class CategoryResponse {
    private Long categoryId;

    private String categoryCode;

    private String categoryName;

    private Long status;

}
