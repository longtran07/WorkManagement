package com.longtran.workservice.services.worktype;

import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.workservice.models.dtos.request.WorkTypeRequest;
import com.longtran.workservice.models.dtos.request.WorkTypeSearchRequest;
import com.longtran.workservice.models.dtos.response.WorkTypeListResponse;
import com.longtran.workservice.models.dtos.response.WorkTypeNameResponse;
import com.longtran.workservice.models.dtos.response.WorkTypeResponse;
import com.longtran.workservice.models.entity.WorkType;
import com.longtran.workservice.repository.WorkTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkTypeServiceImpl implements WorkTypeService {
    WorkTypeRepository workTypeRepository;
    ModelMapper modelMapper;

    @Override
    public List<WorkTypeNameResponse> getAllWorkTypeNames() {
        List<WorkType> workTypes = workTypeRepository.findAll();
        List<WorkTypeNameResponse> workTypeNameResponses = new ArrayList<>();
        workTypes.forEach(workType -> workTypeNameResponses.add(modelMapper.map(workType, WorkTypeNameResponse.class)));
        return workTypeNameResponses;
    }

    @Override
    public WorkTypeListResponse getAllWorkTypes(Pageable pageable) {
        return null;
    }

    @Override
    public WorkTypeResponse getWorkTypeById(Long id) {
        WorkType workType = workTypeRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("Work order type not found"));
        return modelMapper.map(workType, WorkTypeResponse.class);
    }

    @Override
    public WorkType addWorkType(WorkTypeRequest workTypeRequest) {
        WorkType workType = modelMapper.map(workTypeRequest, WorkType.class);
        return workTypeRepository.save(workType);
    }

    @Override
    public WorkType updateWorkType(Long id, WorkTypeRequest workTypeRequest) {
        WorkType workType = workTypeRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("WorkOrder with "+ id +" not found")
        );
        modelMapper.map(workTypeRequest, workType);
        return workTypeRepository.save(workType);
    }

    @Override
    public void deleteWorkType(Long id) {
        workTypeRepository.deleteById(id);
    }


    @Override
    public WorkTypeListResponse searchWorkTypes(WorkTypeSearchRequest workTypeSearchRequest) {
        Pageable pageable=PageRequest.of(workTypeSearchRequest.getPage(),workTypeSearchRequest.getSize());
        Page<WorkType> workTypePage = workTypeRepository.searchWorkTypes(workTypeSearchRequest.getWoTypeCode(),workTypeSearchRequest.getWoTypeName(),  pageable);
        Page<WorkTypeResponse> workTypeResponsePage= workTypePage.map(workType->modelMapper.map(workType, WorkTypeResponse.class));
        return WorkTypeListResponse.builder()
                .workTypeResponse(workTypeResponsePage.getContent())
                .totalPages(workTypeResponsePage.getTotalPages())
                .currentPage(workTypeResponsePage.getNumber())
                .pageSize(workTypeResponsePage.getSize())
                .totalItems(workTypeResponsePage.getTotalElements())
                .isFirst(workTypeResponsePage.isFirst())
                .isLast(workTypeResponsePage.isLast())
                .hasNext(workTypeResponsePage.hasNext())
                .hasPrevious(workTypeResponsePage.hasPrevious())
                .build();
    }
}
