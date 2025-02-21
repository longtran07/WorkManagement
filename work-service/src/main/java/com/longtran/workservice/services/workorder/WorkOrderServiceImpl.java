package com.longtran.workservice.services.workorder;

import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commons.models.dtos.request.DeleteRequest;
import com.longtran.workservice.models.dtos.request.WorkOrderRequest;
import com.longtran.workservice.models.dtos.response.WorkOrderListResponse;
import com.longtran.workservice.models.dtos.response.WorkOrderResponse;
import com.longtran.workservice.models.entity.WorkOrder;
import com.longtran.workservice.models.specification.WorkOrderSpecification;
import com.longtran.workservice.repository.WorkOrderRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
@RequiredArgsConstructor
public class WorkOrderServiceImpl implements WorkOrderService {
    WorkOrderRepository workOrderRepository;
    ModelMapper modelMapper;
    @Override
    public WorkOrderListResponse getAllWorkOrders(Pageable pageable) {
        Page<WorkOrder> workOrderPage = workOrderRepository.findAll(pageable);
        Page<WorkOrderResponse> workOrderResponsesPage= workOrderPage.map(workOrder -> modelMapper.map(workOrder, WorkOrderResponse.class));
        return  WorkOrderListResponse.builder()
                .workOrderResponses(workOrderResponsesPage.getContent())
                .totalPages(workOrderResponsesPage.getTotalPages())
                .currentPage(workOrderResponsesPage.getNumber())
                .pageSize(workOrderResponsesPage.getSize())
                .totalItems(workOrderResponsesPage.getTotalElements())
                .isFirst(workOrderResponsesPage.isFirst())
                .isLast(workOrderResponsesPage.isLast())
                .hasNext(workOrderResponsesPage.hasNext())
                .hasPrevious(workOrderResponsesPage.hasPrevious())
                .build();
    }

    @Override
    public WorkOrder getWorkOrderById(Long id) {
        return workOrderRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("WorkOrder not found")
        );
    }

    @Override
    public WorkOrder addWorkOrder(WorkOrderRequest workOrderRequest) {
        WorkOrder workOrder = modelMapper.map(workOrderRequest, WorkOrder.class);
        return workOrderRepository.save(workOrder);
    }

    @Override
    public WorkOrder updateWorkOrder(Long woId, WorkOrderRequest workOrderRequest) {
        WorkOrder workOrder = workOrderRepository.findById(woId).orElseThrow(
                () -> new DataNotFoundException("WorkOrder with "+woId+" not found")
        );
        modelMapper.map(workOrderRequest, workOrder);
        return workOrderRepository.save(workOrder);

    }

    @Override
    public void deleteWorkOrder(Long id) {
        workOrderRepository.deleteById(id);

    }

    @Override
    public void deleteWorkOrders(DeleteRequest deleteRequest) {
        List<Long> ids=deleteRequest.getIds();
        for(Long id:ids){
            workOrderRepository.findById(id).orElseThrow(
                    ()->new DataNotFoundException("Work order with id " + id + " not found")
            );
            deleteWorkOrder(id);        }

    }

    @Override
    public WorkOrderListResponse searchWorkOrder(WorkOrderRequest workOrderRequest,Pageable pageable) {
        Page<WorkOrder> workOrderPage= workOrderRepository.findAll(
                WorkOrderSpecification.buildSpecification(
                        workOrderRequest.getWoCode(),
                        workOrderRequest.getWoContent(),
                        workOrderRequest.getWoTypeId(),
                        workOrderRequest.getPriorityId(),
                        workOrderRequest.getStatus(),
                        workOrderRequest.getStartTime(),
                        workOrderRequest.getFinishTime(),
                        workOrderRequest.getAssignUserId()),pageable);


        Page<WorkOrderResponse> workOrderResponsesPage= workOrderPage.map(workOrder -> modelMapper.map(workOrder, WorkOrderResponse.class));
        return  WorkOrderListResponse.builder()
                .workOrderResponses(workOrderResponsesPage.getContent())
                .totalPages(workOrderResponsesPage.getTotalPages())
                .currentPage(workOrderResponsesPage.getNumber())
                .pageSize(workOrderResponsesPage.getSize())
                .totalItems(workOrderResponsesPage.getTotalElements())
                .isFirst(workOrderResponsesPage.isFirst())
                .isLast(workOrderResponsesPage.isLast())
                .hasNext(workOrderResponsesPage.hasNext())
                .hasPrevious(workOrderResponsesPage.hasPrevious())
                .build();
//        return workOrderPage.map(workOrder -> modelMapper.map(workOrder, WorkOrderResponse.class));
    }
}
