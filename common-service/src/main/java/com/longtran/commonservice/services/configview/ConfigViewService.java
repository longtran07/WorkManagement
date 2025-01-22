package com.longtran.commonservice.services.configview;



import com.longtran.commonservice.models.dtos.request.ConfigViewRequest;
import com.longtran.commonservice.models.entity.ConfigView;

import java.util.List;

public interface ConfigViewService {
    List<ConfigView> getAllConfigViews();
    ConfigView getConfigViewById(Long id);
    ConfigView createConfigView(ConfigViewRequest configViewRequest);
    ConfigView updateConfigView(Long id, ConfigViewRequest configViewRequest);
    void deleteConfigView(Long id);
}
