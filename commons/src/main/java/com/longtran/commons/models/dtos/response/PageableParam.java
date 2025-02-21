package com.longtran.commons.models.dtos.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PageableParam {
    private int currentPage;
    private int totalPages;
    private int pageSize;
    private long totalItems;
    private boolean isFirst;
    private boolean isLast;
    private boolean hasNext;
    private boolean hasPrevious;
}
