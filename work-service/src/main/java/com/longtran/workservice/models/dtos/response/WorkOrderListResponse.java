package com.longtran.workservice.models.dtos.response;

import com.longtran.commons.models.dtos.response.PageableParam;
import com.longtran.workservice.models.entity.WorkOrder;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class WorkOrderListResponse extends PageableParam {
    List<WorkOrderResponse> workOrderResponses;
}
