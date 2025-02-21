package com.longtran.workservice.models.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkTypeResponse {

    String woTypeCode;

    String woTypeName;

    Long priorityId;

    Long processTime;

    Long status;
}
