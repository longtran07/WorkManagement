package com.longtran.workservice.models.dtos.request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkOrderSearchRequest {
    String woCode;

    String woContent;

    Long woTypeId;

    Long priorityId;

    Long status;

    LocalDateTime startTime;

    LocalDateTime endTime;

    Long assignUserId;

    int page;
    int size;
}
