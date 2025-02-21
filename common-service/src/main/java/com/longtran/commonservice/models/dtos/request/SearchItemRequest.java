package com.longtran.commonservice.models.dtos.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchItemRequest {
    private String itemName;

    private String itemCode;

    private String categoryCode;

    int page;

    int size;

}
