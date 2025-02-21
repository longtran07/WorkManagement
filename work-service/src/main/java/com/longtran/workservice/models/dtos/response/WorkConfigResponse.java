package com.longtran.workservice.models.dtos.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkConfigResponse {

    Long woTypeId;


    Long priorityId;


    Long oldStatus;


    Long newStatus;
}
