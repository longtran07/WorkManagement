package com.longtran.commonservice.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.longtran.commonservice.models.entity.Department;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentResponse {
    @JsonProperty("department_code")
    private String departmentCode;

    @JsonProperty("department_name")
    private String departmentName;
    @JsonProperty("parent_department_id")
    private Long parentDepartmentId;
    @JsonProperty("status")
    private Integer status;
}
