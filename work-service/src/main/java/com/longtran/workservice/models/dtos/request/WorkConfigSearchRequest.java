package com.longtran.workservice.models.dtos.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkConfigSearchRequest {

    Long woTypeId;

    Long priorityId;

    Long oldStatus;

    Long newStatus;

    int page;

    int size;
}
