package com.longtran.workservice.services.workconfig;

import com.longtran.commons.models.dtos.request.DeleteRequest;
import com.longtran.workservice.models.dtos.request.WorkConfigRequest;
import com.longtran.workservice.models.dtos.request.WorkConfigSearchRequest;
import com.longtran.workservice.models.dtos.request.WorkOrderRequest;
import com.longtran.workservice.models.dtos.response.WorkConfigListResponse;
import com.longtran.workservice.models.dtos.response.WorkOrderListResponse;
import com.longtran.workservice.models.entity.WorkConfig;
import com.longtran.workservice.models.entity.WorkOrder;
import org.springframework.data.domain.Pageable;

public interface WorkConfigService {
    WorkConfigListResponse getWorkConfigList(Pageable pageable);
    WorkConfig getWorkConfig(Long id);
    WorkConfig addWorkConfig(WorkConfigRequest workConfigRequest);
    WorkConfig updateWorkConfig(Long id, WorkConfigRequest workConfigRequest);
    void deleteWorkConfig(Long id);
    void deleteWorkConfigs(DeleteRequest deleteRequest);
    WorkConfigListResponse searchWorkConfigs(WorkConfigSearchRequest searchRequest);

}
