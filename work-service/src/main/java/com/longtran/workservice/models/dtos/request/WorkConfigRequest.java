package com.longtran.workservice.models.dtos.request;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkConfigRequest {

    Long woTypeId;

    Long priorityId;

    Long oldStatus;

    Long newStatus;
}
