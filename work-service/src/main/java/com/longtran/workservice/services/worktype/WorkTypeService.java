package com.longtran.workservice.services.worktype;


import com.longtran.workservice.models.dtos.request.WorkTypeRequest;
import com.longtran.workservice.models.dtos.request.WorkTypeSearchRequest;
import com.longtran.workservice.models.dtos.response.WorkTypeListResponse;
import com.longtran.workservice.models.dtos.response.WorkTypeNameResponse;
import com.longtran.workservice.models.dtos.response.WorkTypeResponse;
import com.longtran.workservice.models.entity.WorkType;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface WorkTypeService {
    List<WorkTypeNameResponse> getAllWorkTypeNames();
    WorkTypeListResponse getAllWorkTypes(Pageable pageable);
    WorkTypeResponse getWorkTypeById(Long id);
    WorkType addWorkType(WorkTypeRequest workTypeRequest);
    WorkType updateWorkType(Long id, WorkTypeRequest workTypeRequest);
    void deleteWorkType(Long id);
    WorkTypeListResponse searchWorkTypes(WorkTypeSearchRequest workTypeSearchRequest);


}
