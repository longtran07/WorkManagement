package com.longtran.commonservice.models.dtos.request;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.longtran.commonservice.models.entity.Category;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ItemRequest {

    private String itemName;

    private String itemCode;

    private String itemValue;

    private Long parentItemId;

    private Long categoryId;

    private Integer status;

}
