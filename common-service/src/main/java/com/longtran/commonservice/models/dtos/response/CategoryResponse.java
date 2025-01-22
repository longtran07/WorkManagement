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

    @JsonProperty("category_code")
    private String categoryCode;

    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("status")
    private Long status;

}
