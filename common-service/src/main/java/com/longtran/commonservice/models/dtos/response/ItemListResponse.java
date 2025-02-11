package com.longtran.commonservice.models.dtos.response;

import lombok.*;

import java.util.List;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ItemListResponse {
    List<ItemResponse> itemResponses;
    private int currentPage;
    private int totalPages;
    private int pageSize;
    private long totalItems;
    private boolean isFirst;
    private boolean isLast;
    private boolean hasNext;
    private boolean hasPrevious;
}
