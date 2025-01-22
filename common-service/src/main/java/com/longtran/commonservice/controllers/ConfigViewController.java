package com.longtran.commonservice.controllers;


import com.longtran.commonservice.models.dtos.request.ConfigViewRequest;
import com.longtran.commonservice.models.entity.ConfigView;
import com.longtran.commonservice.services.configview.ConfigViewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/configview")
public class ConfigViewController {
    private final ConfigViewService configViewService;
    @Autowired
    public ConfigViewController(ConfigViewService configViewService) {
        this.configViewService = configViewService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAllConfigViews() {
        List<ConfigView> configViews= configViewService.getAllConfigViews();
        return ResponseEntity.ok().body(configViews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConfigView> getConfigViewById(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(configViewService.getConfigViewById(id));
    }
    @PostMapping("")
    public ResponseEntity<?> addCategory(@RequestBody @Valid ConfigViewRequest configViewRequest) {
        return ResponseEntity.ok().body(configViewService.createConfigView(configViewRequest));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable("id") Long id,
            @RequestBody ConfigViewRequest configViewRequest) {
        return ResponseEntity.ok().body(configViewService.updateConfigView(id, configViewRequest));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        configViewService.deleteConfigView(id);
        return ResponseEntity.ok().body("Deleted Category with id : " + id);
    }

}
