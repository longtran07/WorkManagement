package com.longtran.commonservice.models.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ConfigViewRequest {
    @JsonProperty(  "view_name")
    private String viewName;

    @JsonProperty( "view_path")
    private String viewPath;

    @JsonProperty("api_path")
    private String apiPath;

    @JsonProperty("role_id")
    private String roleId;

    private Integer status;

    @JsonProperty("created_user")
    private long createdUser;

    @JsonProperty("updated_user")
    private long updatedUser;

    public ConfigViewRequest(String viewName, String viewPath, String apiPath, String roleId, Integer status, long createdUser, long updatedUser) {
        this.viewName = viewName;
        this.viewPath = viewPath;
        this.apiPath = apiPath;
        this.roleId = roleId;
        this.status = status;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
    }

    public ConfigViewRequest() {
    }

    public String getViewName() {
        return viewName;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public String getViewPath() {
        return viewPath;
    }

    public void setViewPath(String viewPath) {
        this.viewPath = viewPath;
    }

    public String getApiPath() {
        return apiPath;
    }

    public void setApiPath(String apiPath) {
        this.apiPath = apiPath;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public long getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(long createdUser) {
        this.createdUser = createdUser;
    }

    public long getUpdatedUser() {
        return updatedUser;
    }

    public void setUpdatedUser(long updatedUser) {
        this.updatedUser = updatedUser;
    }
}
