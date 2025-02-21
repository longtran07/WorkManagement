package com.longtran.workservice.models.dtos.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkTypeSearchRequest {
    String woTypeCode;

    String woTypeName;

    int page;

    int size;
}
