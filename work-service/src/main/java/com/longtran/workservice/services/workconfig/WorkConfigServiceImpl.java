package com.longtran.workservice.services.workconfig;

import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commons.models.dtos.request.DeleteRequest;
import com.longtran.workservice.models.dtos.request.WorkConfigRequest;
import com.longtran.workservice.models.dtos.request.WorkConfigSearchRequest;
import com.longtran.workservice.models.dtos.response.WorkConfigListResponse;
import com.longtran.workservice.models.dtos.response.WorkConfigResponse;
import com.longtran.workservice.models.entity.WorkConfig;
import com.longtran.workservice.repository.WorkConfigRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true,level = AccessLevel.PRIVATE)
public class WorkConfigServiceImpl implements WorkConfigService {
    ModelMapper modelMapper;
    WorkConfigRepository workConfigRepository;
    @Override
    public WorkConfigListResponse getWorkConfigList(Pageable pageable) {
        return null;
    }

    @Override
    public WorkConfig getWorkConfig(Long id) {
        workConfigRepository.findById(id).orElseThrow(
                ()->new DataNotFoundException("Work config not found")
        );
        return modelMapper.map(workConfigRepository.findById(id), WorkConfig.class);
    }

    @Override
    public WorkConfig addWorkConfig(WorkConfigRequest workConfigRequest) {
        WorkConfig workConfig = new WorkConfig();
        workConfig.setWoTypeId(workConfigRequest.getWoTypeId());
        workConfig.setPriorityId(workConfigRequest.getPriorityId());
        workConfig.setOldStatus(workConfigRequest.getOldStatus());
        workConfig.setNewStatus(workConfigRequest.getNewStatus());
        return workConfigRepository.save(workConfig);
    }

    @Override
    public WorkConfig updateWorkConfig(Long id, WorkConfigRequest workConfigRequest) {
        WorkConfig workConfig = workConfigRepository.findById(id).orElseThrow(
                ()->new DataNotFoundException("Work config not found")
        );
        modelMapper.map(workConfigRequest, workConfig);
        return workConfigRepository.save(workConfig);
    }

    @Override
    public void deleteWorkConfig(Long id) {
        workConfigRepository.findById(id).orElseThrow(
                ()->new DataNotFoundException("Work config not found")
        );
        workConfigRepository.deleteById(id);
    }

    @Override
    public void deleteWorkConfigs(DeleteRequest deleteRequest) {
        List<Long> ids=deleteRequest.getIds();
        for(Long id:ids){
            workConfigRepository.findById(id).orElseThrow(
                    ()->new DataNotFoundException("Work config with id " + id + " not found")
            );
            workConfigRepository.deleteById(id);        }

    }

    @Override
    public WorkConfigListResponse searchWorkConfigs(WorkConfigSearchRequest searchRequest) {
        Pageable pageable= PageRequest.of(searchRequest.getPage(),searchRequest.getSize());
        Page<WorkConfig> workConfigPage = workConfigRepository.searchConfigs(
                searchRequest.getWoTypeId(),
                searchRequest.getPriorityId(),
                searchRequest.getOldStatus(),
                searchRequest.getNewStatus(),
                pageable);
        Page<WorkConfigResponse> workConfigResponsePage= workConfigPage.map(workConfig->modelMapper.map(workConfig, WorkConfigResponse.class));
        return WorkConfigListResponse.builder()
                .workConfigResponses(workConfigResponsePage.getContent())
                .totalPages(workConfigResponsePage.getTotalPages())
                .currentPage(workConfigResponsePage.getNumber())
                .pageSize(workConfigResponsePage.getSize())
                .totalItems(workConfigResponsePage.getTotalElements())
                .isFirst(workConfigResponsePage.isFirst())
                .isLast(workConfigResponsePage.isLast())
                .hasNext(workConfigResponsePage.hasNext())
                .hasPrevious(workConfigResponsePage.hasPrevious())
                .build();
    }
}
