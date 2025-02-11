package com.longtran.commonservice.models.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategoryRequest {

    private String categoryCode;

    private String categoryName;

    private Long status;

    @JsonProperty("created_user")
    private long createdUser;

    @JsonProperty("updated_user")
    private long updatedUser;
}
