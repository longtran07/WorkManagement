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
    @JsonProperty("item_name")
    private String itemName;

    @JsonProperty("item_code")
    private String itemCode;

    @JsonProperty("item_value")
    private String itemValue;

    @JsonProperty("parent_item_id")
    private Long parentItemId;

    @JsonProperty("category_code")
    private String category_code;

    private Integer status;

    public static ItemResponse fromItem(Item item) {
        return ItemResponse.builder()
                                .itemName(item.getItemName())
                                .itemValue(item.getItemValue())
                                .itemCode(item.getItemCode())
                                .status(item.getStatus())
                                .parentItemId(item.getParentItemId())
                                .category_code(item.getCategory().getCategoryCode())
                                .build();
    }
}
