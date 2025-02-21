package com.longtran.workservice.controller;

import com.longtran.commons.models.dtos.request.DeleteRequest;
import com.longtran.commons.models.dtos.response.ResponseObject;
import com.longtran.workservice.models.dtos.request.WorkOrderRequest;
import com.longtran.workservice.models.dtos.request.WorkOrderSearchRequest;
import com.longtran.workservice.models.dtos.response.WorkOrderListResponse;
import com.longtran.workservice.models.dtos.response.WorkOrderResponse;
import com.longtran.workservice.models.entity.WorkOrder;
import com.longtran.workservice.services.workorder.WorkOrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/workOrder")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
public class WorkOrderController {
    WorkOrderService workOrderService;
    private final ModelMapper modelMapper;

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllWorkOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        WorkOrderListResponse workOrderListResponse=workOrderService.getAllWorkOrders(PageRequest.of(page, size));
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all WorkOrders")
                .result(workOrderListResponse)
                .build());
    }

    @PostMapping("/search")
    public ResponseEntity<ResponseObject> searchWordOrders(
           @RequestBody WorkOrderSearchRequest workOrderRequest) {
        Pageable pageable = PageRequest.of(workOrderRequest.getPage(), workOrderRequest.getSize());
        WorkOrderListResponse workOrderListResponse=workOrderService.searchWorkOrder(modelMapper.map(workOrderRequest,WorkOrderRequest.class), pageable);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Get all Departments")
                .result(
                        workOrderListResponse
                ) // Sử dụng content của Page object
                .build());

    }


    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getWorkOrderById(@PathVariable Long id){
        WorkOrder workOrder = workOrderService.getWorkOrderById(id);

        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Work order with id: "+id)
                        .result(modelMapper.map(workOrder, WorkOrderResponse.class))
                        .build()
        );
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> createWorkOrder(@RequestBody WorkOrderRequest workOrderRequest){
        WorkOrder workOrder= workOrderService.addWorkOrder(workOrderRequest);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.CREATED)
                        .message("WorkOrder created")
                        .result(workOrder)
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateWorkOrder(@PathVariable Long id, @RequestBody WorkOrderRequest workOrderRequest){
        WorkOrder workOrder = workOrderService.updateWorkOrder(id, workOrderRequest);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Update Success")
                        .result(modelMapper.map(workOrder, WorkOrderResponse.class))
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteWorkOrder(@PathVariable Long id){
        workOrderService.deleteWorkOrder(id);
        return ResponseEntity.ok().body(
                ResponseObject.builder()
                        .status(HttpStatus.OK)
                        .message("Delete item success")
                        .build()
        );
    }


    @DeleteMapping("/batch")
    public ResponseEntity<ResponseObject> deleteWorkOrders(@RequestBody DeleteRequest request) {

        workOrderService.deleteWorkOrders(request);
        return ResponseEntity.ok().body(ResponseObject.builder()
                .status(HttpStatus.OK)
                .message("Deleted WorkOrders "+ request.getIds().toString() +" successfully")
                .build());
    }
}
