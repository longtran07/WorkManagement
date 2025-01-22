package com.longtran.commonservice.models.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategoryRequest {
    @JsonProperty("category_code")
    private String categoryCode;

    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("status")
    private Long status;

    @JsonProperty("created_user")
    private long createdUser;

    @JsonProperty("updated_user")
    private long updatedUser;
}
