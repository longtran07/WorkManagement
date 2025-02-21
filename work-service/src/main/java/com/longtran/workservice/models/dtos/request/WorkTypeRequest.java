package com.longtran.workservice.models.dtos.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkTypeRequest {
    String woTypeCode;

    String woTypeName;

    Long processTime;

    Long status;
}
