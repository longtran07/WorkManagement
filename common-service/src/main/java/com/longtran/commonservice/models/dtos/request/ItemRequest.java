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
    @JsonProperty("item_name")
    private String itemName;

    @JsonProperty("item_code")
    private String itemCode;

    @JsonProperty("item_value")
    private String itemValue;

    @JsonProperty("parent_item_id")
    private Long parentItemId;

    @JsonProperty("category_id")
    private Long categoryId;

    private Integer status;

}
