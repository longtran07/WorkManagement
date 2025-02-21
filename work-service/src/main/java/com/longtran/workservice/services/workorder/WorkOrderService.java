package com.longtran.workservice.services.workorder;

import com.longtran.commons.models.dtos.request.DeleteRequest;
import com.longtran.workservice.models.dtos.request.WorkOrderRequest;
import com.longtran.workservice.models.dtos.response.WorkOrderListResponse;
import com.longtran.workservice.models.entity.WorkOrder;
import org.springframework.data.domain.Pageable;

public interface WorkOrderService {
    WorkOrderListResponse getAllWorkOrders(Pageable pageable );
    WorkOrder getWorkOrderById(Long id);
    WorkOrder addWorkOrder(WorkOrderRequest workOrderRequest);
    WorkOrder updateWorkOrder(Long woId, WorkOrderRequest workOrderRequest);
    void deleteWorkOrder(Long id);

    void deleteWorkOrders(DeleteRequest deleteRequest);
    WorkOrderListResponse searchWorkOrder(WorkOrderRequest workOrderRequest, Pageable pageable);
}
