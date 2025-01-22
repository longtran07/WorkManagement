package com.longtran.commonservice.models.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "config_view")

public class ConfigView extends BaseEntity {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "config_view_seq")
    @SequenceGenerator(name = "config_view_seq", sequenceName = "CONFIG_VIEW_SEQ", allocationSize = 1) // Chú ý allocationSize
    @Column(name = "id", nullable = false, updatable = false)

    private Long id;
    @Column(name = "view_name",length = 500)
    private String viewName;

    @Column(name = "view_path", length = 500)
    private String viewPath;

    @Column(name = "api_path", length = 500)
    private String apiPath;

    @Column(name = "role_id",length = 100)
    private String roleId;

    @Column(name = "status")
    private Integer status;

    public ConfigView() {}
    public ConfigView(LocalDateTime createdAt, LocalDateTime updatedAt, long createdUser, long updatedUser, Long id, String viewName, String viewPath, String apiPath, String roleId, Integer status) {
        super(createdAt, updatedAt, createdUser, updatedUser);
        this.id = id;
        this.viewName = viewName;
        this.viewPath = viewPath;
        this.apiPath = apiPath;
        this.roleId = roleId;
        this.status = status;
    }

    public ConfigView(Long id, String viewName, String viewPath, String apiPath, String roleId, Integer status) {
        this.id = id;
        this.viewName = viewName;
        this.viewPath = viewPath;
        this.apiPath = apiPath;
        this.roleId = roleId;
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public void setViewPath(String viewPath) {
        this.viewPath = viewPath;
    }

    public void setApiPath(String apiPath) {
        this.apiPath = apiPath;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
