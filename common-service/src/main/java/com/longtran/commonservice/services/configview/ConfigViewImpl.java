package com.longtran.commonservice.services.configview;


import com.longtran.commonservice.models.dtos.request.ConfigViewRequest;
import com.longtran.commons.exceptions.DataNotFoundException;
import com.longtran.commonservice.models.entity.ConfigView;
import com.longtran.commonservice.repositories.ConfigViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ConfigViewImpl implements ConfigViewService {

    private final ConfigViewRepository configViewRepository;

    @Autowired
    public ConfigViewImpl(ConfigViewRepository configViewRepository) {
        this.configViewRepository = configViewRepository;
    }

    @Override
    public List<ConfigView> getAllConfigViews() {
        return configViewRepository.findAll() ;
    }

    @Override
    public ConfigView getConfigViewById(Long id) {
        return configViewRepository.findById(id).orElseThrow(
                ()-> new DataNotFoundException("Config not found by id" + id)
        );
    }

    @Override
    public ConfigView createConfigView(ConfigViewRequest configViewRequest) {
        ConfigView configView = new ConfigView();
        configView.setViewName(configViewRequest.getViewName());
        configView.setViewPath(configViewRequest.getViewPath());
        configView.setApiPath(configViewRequest.getApiPath());
        configView.setRoleId(configViewRequest.getRoleId());
        configView.setStatus(configViewRequest.getStatus());
        configView.setCreatedUser(configViewRequest.getCreatedUser());

        return configViewRepository.save(configView);
    }

    @Override
    public ConfigView updateConfigView(Long id, ConfigViewRequest configViewRequest) {
        ConfigView configView = getConfigViewById(id);
        configView.setViewName(configViewRequest.getViewName());
        configView.setViewPath(configViewRequest.getViewPath());
        configView.setApiPath(configViewRequest.getApiPath());
        configView.setRoleId(configViewRequest.getRoleId());
        configView.setStatus(configViewRequest.getStatus());
        configView.setUpdatedUser(configViewRequest.getUpdatedUser());
        return configViewRepository.save(configView);
    }

    @Override
    public void deleteConfigView(Long id) {
        ConfigView configView = getConfigViewById(id);
        configViewRepository.delete(configView);
    }
}
