package com.longtran.commonservice.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.longtran.commonservice.models.entity.Category;
import com.longtran.commonservice.models.entity.Item;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ItemResponse {

    private String itemName;


    private String itemCode;

    private String itemValue;


    private Long parentItemId;


    private String category_code;

    private Integer status;
}
