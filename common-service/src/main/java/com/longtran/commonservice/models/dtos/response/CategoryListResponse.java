package com.longtran.commonservice.models.dtos.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class CategoryListResponse {
    List<CategoryResponse> categoryResponses;
    private int totalPages;
}
