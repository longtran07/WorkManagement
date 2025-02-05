package com.longtran.commonservice.models.dtos.request.department;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class DepartmentRequest {
    @JsonProperty("department_code")
    private String departmentCode;

    @JsonProperty("department_name")
    private String departmentName;
    @JsonProperty("parent_department_id")
    private Long parentDepartmentId;
    @JsonProperty("status")
    private Integer status;

}
